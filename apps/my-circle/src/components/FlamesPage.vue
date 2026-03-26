<template>
  <section class="page-shell page-shell--composition">
    <header class="page-hero">
      <div>
        <p class="page-kicker">Circle Builder</p>
        <h1 class="page-title">{{ page.title }}</h1>
        <p class="page-summary">{{ page.description }}</p>
      </div>
      <div class="page-progress">1 of 4</div>
    </header>

    <div class="flames-layout">
      <section class="flames-main">
        <Card class="composition-card">
          <template #content>
            <div class="composition-topline">
              <span class="composition-step">Step 1</span>
              <span class="composition-count">{{ fireState.flames.length }} / {{ maxFlames }}</span>
            </div>

            <div class="input-row">
              <InputText
                v-model="inputValue"
                aria-label="Add a flame"
                class="composition-input"
                :placeholder="inputPlaceholder"
                @focus="isFocused = true"
                @blur="handleBlur"
                @keydown.enter.prevent="addFlame"
              />
              <Button
                label="+"
                aria-label="Add flame"
                class="add-button"
                :disabled="!canAdd"
                @click="addFlame"
              />
            </div>

            <div v-if="showSuggestions" class="suggestions-panel">
              <button
                v-for="suggestion in availableSuggestions"
                :key="suggestion"
                type="button"
                class="suggestion-item"
                @mousedown.prevent="selectSuggestion(suggestion)"
              >
                {{ suggestion }}
              </button>
            </div>

            <p class="add-hint">Add up to five flames. Choose a prompt or write your own.</p>

            <ul v-if="fireState.flames.length" class="flame-list">
              <li v-for="flame in fireState.flames" :key="flame.id" class="flame-row">
                <span class="flame-text">{{ flame.text }}</span>
                <Button
                  rounded
                  text
                  size="small"
                  class="remove-button"
                  :aria-label="`Remove ${flame.text}`"
                  @click="removeFlame(flame.id)"
                >
                  x
                </Button>
              </li>
            </ul>

            <div class="flame-actions">
              <Button label="Continue to Stones" class="continue-button" @click="continueToNext" />
            </div>
          </template>
        </Card>
      </section>

      <aside class="flames-aside">
        <Card class="composition-card composition-card--quiet">
          <template #content>
            <div class="sidebar-label">Blip Type</div>
            <h2 class="sidebar-title">{{ page.title }}</h2>
            <p class="sidebar-copy">{{ page.guidance }}</p>

            <div class="preview-card">
              <div class="preview-title">Circle State</div>
              <pre class="preview-json">{{ previewJson }}</pre>
            </div>
          </template>
        </Card>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, toRaw, watch } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { circlePages, flamesSuggestions } from '../data/circle-pages'
import { createDefaultFlamesState, loadFlamesState, saveFlamesState } from '../storage/flames-store'

const emit = defineEmits(['next-page'])
const page = circlePages.flames
const maxFlames = 5

const fireState = reactive({
  type: page.title,
  description: page.description,
  guidance: page.guidance,
  flames: [],
})

const inputValue = ref('')
const isFocused = ref(false)
const hydrated = ref(false)
let saveTimer = null

const trimmedInput = computed(() => inputValue.value.trim())
const inputPlaceholder = computed(() =>
  fireState.flames.length >= maxFlames ? 'You have added 5 flames' : 'Type a flame or choose a suggestion',
)
const availableSuggestions = computed(() => {
  const taken = new Set(fireState.flames.map((flame) => flame.text))
  return flamesSuggestions.filter((suggestion) => !taken.has(suggestion))
})
const showSuggestions = computed(() => {
  return (
    isFocused.value &&
    trimmedInput.value.length === 0 &&
    fireState.flames.length < maxFlames &&
    availableSuggestions.value.length > 0
  )
})
const canAdd = computed(() => fireState.flames.length < maxFlames && trimmedInput.value.length > 0)
const previewJson = computed(() => JSON.stringify(fireState, null, 2))

onMounted(async () => {
  const saved = await loadFlamesState()
  Object.assign(fireState, createDefaultFlamesState(), saved, {
    type: page.title,
    description: page.description,
    guidance: page.guidance,
    flames: Array.isArray(saved?.flames) ? saved.flames : [],
  })
  hydrated.value = true
})

watch(
  fireState,
  () => {
    if (!hydrated.value) {
      return
    }

    scheduleSave()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  if (hydrated.value) {
    void saveFlamesState(toRaw(fireState))
  }
  clearSaveTimer()
})

function scheduleSave() {
  clearSaveTimer()
  saveTimer = window.setTimeout(async () => {
    await saveFlamesState(toRaw(fireState))
  }, 3000)
}

function clearSaveTimer() {
  if (saveTimer) {
    window.clearTimeout(saveTimer)
    saveTimer = null
  }
}

function handleBlur() {
  window.setTimeout(() => {
    isFocused.value = false
  }, 120)
}

function selectSuggestion(suggestion) {
  inputValue.value = suggestion
  isFocused.value = true
}

function createId() {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `flame-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function addFlame() {
  if (!canAdd.value) {
    return
  }

  fireState.flames = [
    ...fireState.flames,
    {
      id: createId(),
      text: trimmedInput.value,
      addedOn: new Date().toISOString().slice(0, 10),
    },
  ]

  inputValue.value = ''
  isFocused.value = false
}

function removeFlame(id) {
  fireState.flames = fireState.flames.filter((flame) => flame.id !== id)
}

async function continueToNext() {
  emit('next-page', page.nextPage)
}
</script>
