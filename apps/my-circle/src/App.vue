<template>
  <main class="app-shell">
    <h1 class="title">MyCircle Radar (Prototype)</h1>
    <p class="subtitle">
      A simple personal-tech radar inspired by Thoughtworks Radar: three rings (Outer, Middle, Inner) and three quadrants
      (Knives, Stones, Songs) for families, communities, and organizations.
    </p>

    <section class="radar-card">
      <MyCircle />

      <div class="legend-grid">
        <div class="legend-item">
          <div class="legend-label">Outer Ring</div>
          <div class="legend-value">Assess</div>
        </div>
        <div class="legend-item">
          <div class="legend-label">Middle Ring</div>
          <div class="legend-value">Trial</div>
        </div>
        <div class="legend-item">
          <div class="legend-label">Inner Ring</div>
          <div class="legend-value">Adopt</div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import MyCircle from './components/myCircle.vue'
</script>

