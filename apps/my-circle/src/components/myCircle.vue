<template>
  <div class="radar-wrap">
    <svg viewBox="0 0 800 800" class="radar" role="img" aria-label="MyCircle technology radar">
      <circle :cx="center" :cy="center" :r="radii.outer" class="ring" />
      <circle :cx="center" :cy="center" :r="radii.middle" class="ring" />
      <circle :cx="center" :cy="center" :r="radii.inner" class="ring" />

      <line
        v-for="(angle, idx) in boundaryAngles"
        :key="`line-${idx}`"
        :x1="center"
        :y1="center"
        :x2="pointAt(angle, radii.outer).x"
        :y2="pointAt(angle, radii.outer).y"
        class="axis"
      />

      <text
        v-for="ringLabel in ringLabels"
        :key="ringLabel.name"
        :x="center + ringLabel.radius + 8"
        :y="center - 6"
        class="ring-label"
      >
        {{ ringLabel.name }}
      </text>

      <text
        v-for="quadrant in quadrants"
        :key="quadrant.name"
        :x="pointAt(quadrant.centerAngle, radii.outer + 42).x"
        :y="pointAt(quadrant.centerAngle, radii.outer + 42).y"
        class="quadrant-label"
      >
        {{ quadrant.name }}
      </text>

      <g v-for="blip in positionedBlips" :key="blip.id">
        <circle :cx="blip.x" :cy="blip.y" r="9" :class="['blip', blip.quadrant]" />
        <text :x="blip.x + 12" :y="blip.y + 4" class="blip-label">
          {{ blip.name }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const center = 400
const radii = {
  inner: 95,
  middle: 185,
  outer: 275,
}

const quadrants = [
  { name: 'Knives', key: 'knives', start: -90, end: 30, centerAngle: -30 },
  { name: 'Stones', key: 'stones', start: 30, end: 150, centerAngle: 90 },
  { name: 'Songs', key: 'songs', start: 150, end: 270, centerAngle: 210 },
]

const ringLabels = [
  { name: 'Inner (Adopt)', radius: radii.inner },
  { name: 'Middle (Trial)', radius: radii.middle },
  { name: 'Outer (Assess)', radius: radii.outer },
]

const boundaryAngles = quadrants.map((q) => q.start)

const blips = [
  { id: 'knives', name: 'Knives', quadrant: 'knives', ring: 'middle' },
  { id: 'stones', name: 'Stones', quadrant: 'stones', ring: 'inner' },
  { id: 'songs', name: 'Songs', quadrant: 'songs', ring: 'outer' },
]

const ringRanges = {
  inner: [18, radii.inner - 14],
  middle: [radii.inner + 14, radii.middle - 14],
  outer: [radii.middle + 14, radii.outer - 14],
}

const positionedBlips = computed(() => {
  return blips.map((blip) => {
    const sector = quadrants.find((q) => q.key === blip.quadrant)
    const [minR, maxR] = ringRanges[blip.ring]
    const jitter = hash(blip.id)

    const angle = sector.start + 16 + jitter * (sector.end - sector.start - 32)
    const radius = minR + jitter * (maxR - minR)
    const p = pointAt(angle, radius)

    return { ...blip, ...p }
  })
})

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
</script>

<style scoped>
.radar-wrap {
  width: 100%;
  overflow: auto;
}

.radar {
  width: 100%;
  min-width: 580px;
  height: auto;
  background: radial-gradient(circle, rgba(30, 41, 59, 0.55) 0%, rgba(8, 10, 17, 0) 75%);
  border-radius: 14px;
}

.ring {
  fill: none;
  stroke: #334155;
  stroke-width: 1.6;
}

.axis {
  stroke: #2f3c57;
  stroke-width: 1.3;
}

.ring-label {
  fill: #cbd5e1;
  font-size: 12px;
}

.quadrant-label {
  fill: #f8fafc;
  font-size: 16px;
  font-weight: 600;
  text-anchor: middle;
}

.blip {
  stroke: #020617;
  stroke-width: 2;
}

.blip.knives {
  fill: #f87171;
}

.blip.stones {
  fill: #94a3b8;
}

.blip.songs {
  fill: #60a5fa;
}

.blip-label {
  fill: #f8fafc;
  font-size: 12px;
  font-weight: 600;
}

@media (max-width: 720px) {
  .radar {
    min-width: 0;
  }

  .quadrant-label {
    font-size: 13px;
  }

  .blip-label {
    font-size: 11px;
  }
}
</style>
