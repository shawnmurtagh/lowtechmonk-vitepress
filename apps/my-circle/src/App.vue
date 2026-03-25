<template>
  <main class="app-shell">
    <h1 class="title">MyCircle Low Tech Monk Circle</h1>
    <p class="subtitle">
      A fire-centered circle for families, communities, and organizations. Flames sit at the center, stones rest on the
      ring around the fire, and songs and tools move through the inner, trying, and thinking rings.
    </p>

    <section class="radar-card">
      <div class="circle-layout">
        <div class="circle-main">
          <MyCircle />

          <div class="legend-grid">
            <div class="legend-item">
              <div class="legend-label">Center</div>
              <div class="legend-value">Fire</div>
            </div>
            <div class="legend-item">
              <div class="legend-label">Stone Ring</div>
              <div class="legend-value">Memories at the Fire's Edge</div>
            </div>
            <div class="legend-item">
              <div class="legend-label">First Ring</div>
              <div class="legend-value">Inner</div>
            </div>
            <div class="legend-item">
              <div class="legend-label">Second Ring</div>
              <div class="legend-value">Trying</div>
            </div>
            <div class="legend-item">
              <div class="legend-label">Third Ring</div>
              <div class="legend-value">Thinking</div>
            </div>
          </div>
        </div>

        <aside class="circle-panel">
          <div class="panel-header">
            <div class="panel-title">Circle Images</div>
            <div class="panel-subtitle">Toggle what appears in the list.</div>
          </div>

          <div class="toggle-row">
            <label v-for="group in listGroups" :key="group.key" class="toggle-chip">
              <input v-model="visibleGroups[group.key]" type="checkbox" />
              <span>{{ group.label }}</span>
            </label>
          </div>

          <div class="meaning-grid">
            <div v-for="group in listGroups" :key="group.key" class="meaning-item">
              <div class="meaning-label">{{ group.label }}</div>
              <div class="meaning-value">{{ group.definition }}</div>
            </div>
          </div>

          <div class="item-list">
            <section v-for="group in filteredGroups" :key="group.key" class="item-group">
              <h2 class="item-group-title">{{ group.label }}</h2>
              <ul class="item-group-list">
                <li v-for="item in group.items" :key="item.id" class="item-row">
                  <span class="item-number">{{ item.number }}</span>
                  <div class="item-copy">
                    <div class="item-name">{{ item.name }}</div>
                    <div class="item-meta">{{ item.image }} · Added {{ formatDate(item.addedOn) }}</div>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, reactive } from 'vue'
import MyCircle from './components/myCircle.vue'
import { listGroups } from './data/myCircleData'

const visibleGroups = reactive({
  flames: true,
  songs: true,
  stones: true,
  tools: true,
})

const filteredGroups = computed(() =>
  listGroups.filter((group) => visibleGroups[group.key]),
)

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
