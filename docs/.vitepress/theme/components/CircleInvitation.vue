<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')
</script>

<template>
  <section v-if="!isHome" class="circle-invitation">
    <div class="circle-invitation__frame">
      <p class="circle-invitation__kicker">Build Your Circle</p>
      <h2 class="circle-invitation__title">Take the next honest step.</h2>
      <p class="circle-invitation__copy">
        The work here is meant to be lived. When you are ready, begin the circle and let your
        values shape what belongs near the fire.
      </p>
      <div class="circle-invitation__actions">
        <a class="circle-invitation__button" href="https://app.lowtechmonk.com">
          Build Your Circle
        </a>
        <a class="circle-invitation__link" href="/from-reading-to-practice">From reading to practice</a>
      </div>
    </div>
  </section>
</template>
