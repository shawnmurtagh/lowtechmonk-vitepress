import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "lowtechmonk",
  description: "A cyber wisdom framework engineered to help the next generation of tech users stand up and win against the big-tech landslide",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Wisdom Literature', link: '/introduction' }
    ],

    sidebar: [
      {
        text: 'Winsdom Literature',
        items: [
          { text: 'Rationale', link: '/introduction' },
          { text: 'The Way', link: '/the-way' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
