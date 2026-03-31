import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': '/components', // Example alias for components directory
      },
    },
  },
  title: "lowtechmonk",
  description: "A cyber wisdom framework engineered to help the next generation of tech users stand up and win against the big-tech landslide",
  themeConfig: {
    logo: '../lowtechmonk.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Build Your Circle', link: 'https://app.lowtechmonk.com' },
      {
        text: 'Wisdom Literature',
        items: [
          { text: 'Fear Forgetting', link: '/wisdom-literature/fear-forgetting' },
          { text: 'The Circle of Trust', link: '/wisdom-literature/the-circle-of-trust' },
          { text: 'On AI Music and the Memory of Song', link: '/wisdom-literature/on-ai-and-the-memory-of-song' },
          { text: 'The Chief Inside', link: '/wisdom-literature/the-chief-inside' },
          { text: 'The Low Tech Monk', link: '/wisdom-literature/the-way-of-the-low-tech-monk' }
        ]
      },
      { text: 'Fables', 
        items: [
          { text: 'There are Giants in the Land (One)', link: '/fables/there-are-giants-in-the-land-1' },
          { text: 'There are Giants in the Land (Two)', link: '/fables/there-are-giants-in-the-land-2' },
        ]  
      }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'The Why', link: '/the-why' },
          { text: 'The Way', link: '/the-way' },
          { text: 'From Reading to Practice', link: '/from-reading-to-practice' },
          { text: 'Your Journey', 
            items:[
              { text: 'Light your Fire', link: '/fire' }
          ] }
        ]
      },
      {
        text: 'Wisdom Literature',
          items: [
            { text: 'Fear Forgetting', link: '/wisdom-literature/fear-forgetting' },
            { text: 'The Circle of Trust', link: '/wisdom-literature/the-circle-of-trust' },
            { text: 'On AI Music and the Memory of Song', link: '/wisdom-literature/on-ai-and-the-memory-of-song' },
            { text: 'The Chief Inside', link: '/wisdom-literature/the-chief-inside' },
            { text: 'The Low Tech Monk', link: '/wisdom-literature/the-way-of-the-low-tech-monk' }
        ]
      },
      {
        text: 'Fables',
          items: [
            { text: 'There are Giants in the Land I', link: '/fables/there-are-giants-in-the-land-1' },
            { text: 'There are Giants in the Land II', link: '/fables/there-are-giants-in-the-land-2' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shawnmurtagh/lowtechmonk-vitepress' }
    ]
  }
})
