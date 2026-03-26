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
          <MyCircle @select-item="openDetails" />

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

          <div class="toggle-grid">
            <label
              v-for="group in listGroups"
              :key="group.key"
              class="toggle-chip"
              :class="{ 'toggle-chip--active': visibleGroups[group.key] }"
            >
              <input v-model="visibleGroups[group.key]" type="checkbox" />
              <span>{{ group.label }}</span>
            </label>
          </div>

          <div class="item-list">
            <section v-for="group in filteredGroups" :key="group.key" class="item-group">
              <h2 class="item-group-title">{{ group.label }}</h2>
              <ul class="item-group-list">
                <li v-for="item in group.items" :key="item.id">
                  <button type="button" class="item-row" @click="openDetails(item)">
                    <span class="item-number">{{ item.number }}</span>
                    <div class="item-copy">
                      <div class="item-name">{{ item.name }}</div>
                      <div class="item-meta">{{ item.image }} | Added {{ formatDate(item.addedOn) }}</div>
                    </div>
                  </button>
                </li>
              </ul>
            </section>
          </div>
        </aside>
      </div>
    </section>

    <teleport to="body">
      <div v-if="activeItem" class="modal-backdrop" @click.self="closeDetails">
        <section class="modal-card" role="dialog" aria-modal="true" :aria-label="activeItem.name">
          <div class="modal-header">
            <div>
              <div class="modal-type">{{ activeItem.image }}</div>
              <h2 class="modal-title">{{ activeItem.name }}</h2>
            </div>
            <button type="button" class="modal-close" @click="closeDetails">Close</button>
          </div>

          <div class="modal-meta">Added {{ formatDate(activeItem.addedOn) }}</div>
          <p class="modal-description">{{ activeItem.description }}</p>
        </section>
      </div>
    </teleport>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
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

const activeItem = ref(null)

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function openDetails(item) {
  activeItem.value = item
}

function closeDetails() {
  activeItem.value = null
}

function onKeydown(event) {
  if (event.key === 'Escape' && activeItem.value) {
    closeDetails()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>
