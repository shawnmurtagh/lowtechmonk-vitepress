<template>
  <div class="radar-wrap">
    <svg viewBox="0 0 860 860" class="radar" role="img" aria-label="Low Tech Monk circle">
      <defs>
        <radialGradient id="fireGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#fff0bf" stop-opacity="1" />
          <stop offset="22%" stop-color="#ffd27a" stop-opacity="0.95" />
          <stop offset="48%" stop-color="#f59e0b" stop-opacity="0.55" />
          <stop offset="72%" stop-color="#9a3412" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#1f2937" stop-opacity="0" />
        </radialGradient>
      </defs>

      <circle :cx="center" :cy="center" :r="radii.thinking" class="warmth-field" />
      <circle :cx="center" :cy="center" :r="radii.thinking" class="ring ring-thinking" />
      <circle :cx="center" :cy="center" :r="radii.trying" class="ring ring-trying" />
      <circle :cx="center" :cy="center" :r="radii.inner" class="ring ring-inner" />
      <circle :cx="center" :cy="center" :r="radii.fire" class="fire-core" />

      <line
        v-for="(angle, idx) in boundaryAngles"
        :key="`line-${idx}`"
        :x1="center"
        :y1="center"
        :x2="pointAt(angle, radii.thinking).x"
        :y2="pointAt(angle, radii.thinking).y"
        class="axis"
      />

      <g
        v-for="item in positionedFlames"
        :key="item.id"
        class="blip-group"
        role="button"
        tabindex="0"
        @mouseenter="showTooltip($event, item)"
        @mousemove="moveTooltip($event)"
        @mouseleave="hideTooltip"
        @click="selectItem(item)"
        @keydown.enter.prevent="selectItem(item)"
        @keydown.space.prevent="selectItem(item)"
      >
        <circle :cx="item.x" :cy="item.y" r="13" class="blip flame" />
        <text :x="item.x" :y="item.y" class="blip-number">{{ item.number }}</text>
      </g>

      <g
        v-for="item in positionedStones"
        :key="item.id"
        class="blip-group"
        role="button"
        tabindex="0"
        @mouseenter="showTooltip($event, item)"
        @mousemove="moveTooltip($event)"
        @mouseleave="hideTooltip"
        @click="selectItem(item)"
        @keydown.enter.prevent="selectItem(item)"
        @keydown.space.prevent="selectItem(item)"
      >
        <circle :cx="item.x" :cy="item.y" r="12" class="blip stone" />
        <text :x="item.x" :y="item.y" class="blip-number dark">{{ item.number }}</text>
      </g>

      <text
        v-for="ringLabel in ringLabels"
        :key="ringLabel.name"
        :x="center"
        :y="center - ringLabel.radius + 14"
        class="ring-label"
      >
        {{ ringLabel.name }}
      </text>

      <text
        v-for="quadrant in quadrants"
        :key="quadrant.name"
        :x="pointAt(quadrant.centerAngle, radii.thinking + 48).x"
        :y="pointAt(quadrant.centerAngle, radii.thinking + 48).y"
        class="quadrant-label"
      >
        {{ quadrant.name }}
      </text>

      <g
        v-for="item in positionedQuadrantItems"
        :key="item.id"
        class="blip-group"
        role="button"
        tabindex="0"
        @mouseenter="showTooltip($event, item)"
        @mousemove="moveTooltip($event)"
        @mouseleave="hideTooltip"
        @click="selectItem(item)"
        @keydown.enter.prevent="selectItem(item)"
        @keydown.space.prevent="selectItem(item)"
      >
        <circle :cx="item.x" :cy="item.y" r="13" :class="['blip', item.groupKey]" />
        <text :x="item.x" :y="item.y" class="blip-number">{{ item.number }}</text>
      </g>
    </svg>

    <div
      v-if="tooltip.visible"
      class="hover-tooltip"
      :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
    >
      <div class="tooltip-name">{{ tooltip.item.name }}</div>
      <div class="tooltip-meta">{{ tooltip.item.image }}</div>
      <div class="tooltip-meta">Added {{ formatDate(tooltip.item.addedOn) }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { flames, quadrants, stones } from '../data/myCircleData'

const emit = defineEmits(['select-item'])

const center = 430
const radii = {
  fire: 94,
  inner: 176,
  trying: 244,
  thinking: 312,
}

const quadrantLayout = [
  { name: 'Tools', key: 'tools', start: -90, end: 90, centerAngle: 0 },
  { name: 'Songs', key: 'songs', start: 90, end: 270, centerAngle: 180 },
]

const boundaryAngles = [90, 270]

const ringLabels = [
  { name: 'Inner Ring', radius: radii.inner },
  { name: 'Trying Ring', radius: radii.trying },
  { name: 'Thinking Ring', radius: radii.thinking },
]

const ringRanges = {
  inner: [radii.fire + 14, radii.inner - 18],
  trying: [radii.inner + 16, radii.trying - 18],
  thinking: [radii.trying + 16, radii.thinking - 18],
}

const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  item: null,
})

const positionedBlips = computed(() => {
  const occupied = []
  const stonesPlaced = placeItems(
    stones,
    occupied,
    (item, index, attempt) => {
      const baseAngle = -150 + index * 100
      return {
        ...item,
        groupKey: 'stones',
        radius: 12,
        ...pointAt(baseAngle + attempt * 4 - 8, radii.fire + (attempt - 5) * 0.2),
      }
    },
    12,
  )

  const flamesPlaced = placeItems(
    flames,
    occupied,
    (item, index, attempt) => ({
      ...item,
      radius: 13,
      ...pointAt(
        -120 + index * 80 + attempt * 7 - 14,
        Math.min(radii.fire - 5, radii.fire - 34 + attempt * 2),
      ),
    }),
    13,
  )

  const quadrantItemsPlaced = quadrants.flatMap((quadrant) => {
    const layout = quadrantLayout.find((entry) => entry.key === quadrant.key)

    return placeItems(
      quadrant.blips,
      occupied,
      (item, index, attempt) => {
        const [minR, maxR] = ringRanges[item.ring]
        const jitter = hash(item.id)
        const angle =
          layout.start +
          18 +
          jitter * (layout.end - layout.start - 36) +
          (attempt - 4) * 6
        const radius = minR + jitter * (maxR - minR) + (attempt - 4) * 4

        return {
          ...item,
          groupKey: quadrant.key,
          radius: 13,
          ...pointAt(angle, radius),
        }
      },
      13,
    )
  })

  return {
    flames: flamesPlaced,
    stones: stonesPlaced,
    quadrants: quadrantItemsPlaced,
  }
})

const positionedFlames = computed(() => positionedBlips.value.flames)
const positionedStones = computed(() => positionedBlips.value.stones)
const positionedQuadrantItems = computed(() => positionedBlips.value.quadrants)

function pointAt(angleDeg, radius) {
  const t = (angleDeg * Math.PI) / 180
  return {
    x: center + Math.cos(t) * radius,
    y: center + Math.sin(t) * radius,
  }
}

function hash(value) {
  let out = 0
  for (let i = 0; i < value.length; i += 1) {
    out = (out * 31 + value.charCodeAt(i)) % 997
  }
  return out / 997
}

function placeItems(items, occupied, createCandidate, radius) {
  return items.map((item, index) => {
    let fallback = null

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const candidate = createCandidate(item, index, attempt)
      fallback = candidate

      if (isValidPlacement(candidate, occupied, radius)) {
        occupied.push(candidate)
        return candidate
      }
    }

    occupied.push(fallback)
    return fallback
  })
}

function isValidPlacement(candidate, occupied, radius) {
  return occupied.every((existing) => {
    const minimumDistance =
      candidate.groupKey === 'stones' && existing.groupKey === 'stones'
        ? radius + (existing.radius ?? radius) + 1
        : radius + (existing.radius ?? radius) + 15
    return distance(candidate, existing) >= minimumDistance
  })
}

function distance(a, b) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function showTooltip(event, item) {
  tooltip.item = item
  tooltip.visible = true
  updateTooltipPosition(event)
}

function moveTooltip(event) {
  if (!tooltip.visible) {
    return
  }
  updateTooltipPosition(event)
}

function hideTooltip() {
  tooltip.visible = false
}

function selectItem(item) {
  emit('select-item', item)
}

function updateTooltipPosition(event) {
  const bounds = event.currentTarget.ownerSVGElement.getBoundingClientRect()
  tooltip.x = event.clientX - bounds.left + 16
  tooltip.y = event.clientY - bounds.top + 16
}
</script>

<style scoped>
.radar-wrap {
  position: relative;
  width: 100%;
  overflow: auto;
}

.radar {
  width: 100%;
  min-width: 620px;
  height: auto;
  border-radius: 18px;
  background:
    radial-gradient(circle at center, rgba(245, 158, 11, 0.23) 0%, rgba(245, 158, 11, 0.1) 12%, rgba(15, 23, 42, 0) 26%),
    linear-gradient(180deg, #1c1917 0%, #0f172a 100%);
}

.ring,
.warmth-field {
  fill: none;
  stroke-width: 1.6;
}

.warmth-field {
  fill: url(#fireGlow);
  opacity: 0.42;
  stroke: none;
}

.ring-thinking {
  stroke: #334155;
}

.ring-trying {
  stroke: #475569;
}

.ring-inner {
  stroke: #64748b;
}

.fire-core {
  fill: url(#fireGlow);
  stroke: #fed7aa;
  stroke-width: 2;
}

.axis {
  stroke: rgba(148, 163, 184, 0.28);
  stroke-width: 1.3;
}

.ring-label {
  fill: #cbd5e1;
  font-size: 12px;
  text-anchor: middle;
}

.quadrant-label {
  fill: #f8fafc;
  font-size: 16px;
  font-weight: 600;
  text-anchor: middle;
}

.blip-group {
  cursor: default;
}

.blip-group[role='button'] {
  cursor: pointer;
}

.blip {
  stroke: #020617;
  stroke-width: 2;
}

.blip.flame {
  fill: #fb923c;
}

.blip.stone {
  fill: #d6d3d1;
}

.blip.tools {
  fill: #f97316;
}

.blip.songs {
  fill: #38bdf8;
}

.blip-number {
  fill: #f8fafc;
  font-size: 11px;
  font-weight: 700;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
}

.blip-number.dark {
  fill: #111827;
}

.hover-tooltip {
  position: absolute;
  z-index: 2;
  min-width: 152px;
  max-width: 220px;
  padding: 0.6rem 0.7rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.96);
  box-shadow: 0 12px 28px rgba(2, 6, 23, 0.4);
  pointer-events: none;
}

.tooltip-name {
  color: #f8fafc;
  font-size: 0.88rem;
  font-weight: 700;
}

.tooltip-meta {
  margin-top: 0.15rem;
  color: #cbd5e1;
  font-size: 0.76rem;
}

@media (max-width: 720px) {
  .radar {
    min-width: 0;
  }

  .quadrant-label {
    font-size: 13px;
  }
}
</style>
