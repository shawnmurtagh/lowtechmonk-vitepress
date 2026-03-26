<template>
  <main class="app-shell workspace-shell">
    <header class="workspace-header">
      <div>
        <p class="workspace-kicker">Low Tech Monk Circle</p>
        <h1 class="workspace-title">{{ currentPageTitle }}</h1>
        <p class="workspace-summary">
          A sequential circle-building flow. Your place is reflected in the URL so refresh, back, and direct links stay in sync.
        </p>
      </div>

      <div class="flow-meta">
        <div class="page-progress">{{ currentIndex + 1 }} of {{ orderedPages.length }}</div>
        <div class="flow-path">{{ flowPath }}</div>
      </div>
    </header>

    <div class="flow-nav" aria-label="Circle progress">
      <div
        v-for="(page, index) in orderedPages"
        :key="page.key"
        class="flow-step"
        :class="{ 'flow-step--active': currentPage === page.key }"
      >
        <span class="flow-step__index">{{ index + 1 }}</span>
        <span class="flow-step__label">{{ page.label }}</span>
      </div>
    </div>

    <section class="workspace-body">
      <FlamesPage v-if="currentPage === 'flames'" @next-page="goToPage" />
      <PlaceholderPage v-else-if="currentPage === 'stones'" kind="stones" @next-page="goToPage" />
      <PlaceholderPage v-else-if="currentPage === 'songs'" kind="songs" @next-page="goToPage" />
      <PlaceholderPage v-else-if="currentPage === 'tools'" kind="tools" @next-page="goToPage" />
      <CircleRadarPage
        v-else-if="currentPage === 'circle'"
        :visible-groups="visibleGroups"
      />
    </section>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CircleRadarPage from './components/CircleRadarPage.vue'
import FlamesPage from './components/FlamesPage.vue'
import PlaceholderPage from './components/PlaceholderPage.vue'

const orderedPages = [
  { key: 'flames', label: 'Flames' },
  { key: 'stones', label: 'Stones' },
  { key: 'songs', label: 'Songs' },
  { key: 'tools', label: 'Tools' },
  { key: 'circle', label: 'Circle' },
]

const defaultPage = 'flames'
const currentPage = ref(getPageFromHash())

const currentIndex = computed(() => Math.max(0, orderedPages.findIndex((page) => page.key === currentPage.value)))
const currentPageTitle = computed(() => orderedPages[currentIndex.value]?.label ?? 'Flames')
const flowPath = computed(() => orderedPages.map((page) => page.label).join(' / '))

function getPageFromHash() {
  const rawHash = window.location.hash.replace(/^#\/?/, '')
  return orderedPages.some((page) => page.key === rawHash) ? rawHash : defaultPage
}

function hasValidHash() {
  const rawHash = window.location.hash.replace(/^#\/?/, '')
  return orderedPages.some((page) => page.key === rawHash)
}

function writeHash(pageKey, replace = false) {
  const hash = `#/${pageKey}`

  if (replace) {
    window.history.replaceState(null, '', hash)
    return
  }

  if (window.location.hash !== hash) {
    window.location.hash = hash
  }
}

function goToPage(pageKey) {
  if (!orderedPages.some((page) => page.key === pageKey)) {
    return
  }

  currentPage.value = pageKey
  writeHash(pageKey)
}

function handleHashChange() {
  if (!hasValidHash()) {
    currentPage.value = defaultPage
    writeHash(defaultPage, true)
    return
  }

  currentPage.value = getPageFromHash()
}

onMounted(() => {
  if (!window.location.hash || !hasValidHash()) {
    writeHash(currentPage.value, true)
  }

  window.addEventListener('hashchange', handleHashChange)
  window.addEventListener('popstate', handleHashChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', handleHashChange)
  window.removeEventListener('popstate', handleHashChange)
})
</script>
