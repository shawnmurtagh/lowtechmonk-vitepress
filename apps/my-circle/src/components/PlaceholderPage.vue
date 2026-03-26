<template>
  <section class="page-shell page-shell--composition">
    <header class="page-hero">
      <div>
        <p class="page-kicker">Circle Builder</p>
        <h1 class="page-title">{{ page.title }}</h1>
        <p class="page-summary">{{ page.description }}</p>
      </div>
      <div class="page-progress">Coming next</div>
    </header>

    <div class="flames-layout">
      <section class="flames-main">
        <Card class="composition-card">
          <template #content>
            <div class="composition-topline">
              <span class="composition-step">Placeholder</span>
            </div>

            <p class="sidebar-copy">
              {{ page.guidance }}
            </p>

            <div class="flame-actions">
              <Button :label="`Continue to ${nextLabel}`" class="continue-button" @click="emit('next-page', page.nextPage)" />
            </div>
          </template>
        </Card>
      </section>

      <aside class="flames-aside">
        <Card class="composition-card composition-card--quiet">
          <template #content>
            <div class="sidebar-label">Read Only Preview</div>
            <h2 class="sidebar-title">{{ page.title }}</h2>
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
import { computed } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { circlePages } from '../data/circle-pages'

const props = defineProps({
  kind: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['next-page'])

const page = computed(() => circlePages[props.kind])
const nextLabel = computed(() => circlePages[page.value.nextPage]?.title ?? 'Next')

const previewJson = computed(() =>
  JSON.stringify(
    {
      type: page.value.title,
      description: page.value.description,
      items: [],
    },
    null,
    2,
  ),
)
</script>
