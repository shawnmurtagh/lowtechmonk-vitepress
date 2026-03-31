// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import CircleInvitation from './components/CircleInvitation.vue'
import LandingPageSections from './components/LandingPageSections.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CircleInvitation),
    })
  },
  enhanceApp({ app }) {
    app.component('LandingPageSections', LandingPageSections)
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
      },
    })
  },
} satisfies Theme
