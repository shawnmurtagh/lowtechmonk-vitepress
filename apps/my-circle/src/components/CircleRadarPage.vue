<template>
  <section class="radar-card" :class="{ 'radar-card--fullscreen': isExpanded }">
    <div class="circle-layout" :class="{ 'circle-layout--fullscreen': isExpanded }">
      <div class="circle-main">
        <div class="circle-controls">
          <div class="toggle-grid toggle-grid--overlay">
            <label
              v-for="group in listGroups"
              :key="group.key"
              class="toggle-chip"
              :class="{ 'toggle-chip--active': props.visibleGroups[group.key] }"
            >
              <input v-model="props.visibleGroups[group.key]" type="checkbox" />
              <span>{{ group.label }}</span>
            </label>
          </div>

          <button
            type="button"
            class="circle-expand"
            :aria-label="isExpanded ? 'Done meditating' : 'Meditation mode'"
            @click="toggleExpanded"
          >
            <span aria-hidden="true">◢</span>
            <span>{{ isExpanded ? 'Done Meditating' : 'Meditation Mode' }}</span>
          </button>
        </div>

        <MyCircle
          :visible-groups="props.visibleGroups"
          @select-item="openDetails"
        />
      </div>

      <aside v-if="!isExpanded" class="circle-panel">
        <div class="panel-header">
          <div class="panel-title">Circle Images</div>
          <div class="panel-subtitle">Toggle what appears in the list.</div>
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
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import MyCircle from './myCircle.vue'
import { listGroups } from '../data/myCircleData'

const props = defineProps({
  visibleGroups: {
    type: Object,
    required: true,
  },
})

const filteredGroups = computed(() => listGroups.filter((group) => props.visibleGroups[group.key]))

const activeItem = ref(null)
const isExpanded = ref(false)

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

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

function onKeydown(event) {
  if (event.key === 'Escape' && activeItem.value) {
    closeDetails()
    return
  }

  if (event.key === 'Escape' && isExpanded.value) {
    isExpanded.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>
