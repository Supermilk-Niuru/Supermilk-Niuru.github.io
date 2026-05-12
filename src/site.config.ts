import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  title: "Niuru's blog",
  author: 'Supermilk-Niuru',
  description: 'Stay hungry, stay foolish',
  favicon: '/favicon/favicon.ico',
  socialCard: '/images/social-card.png',

  locale: {
    lang: 'en-US',
    attrs: 'en-US',
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },

  logo: {
    src: '/src/assets/avatar.png',
    alt: 'Supermilk-Niuru'
  },

  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  header: {
    menu: [
      { title: 'Home', link: '/' },
      { title: 'Blog', link: '/blog' },
      { title: 'Projects', link: '/projects' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' }
    ]
  },

  footer: {
    year: `© ${new Date().getFullYear()}`,
    links: [
      {
        title: 'GitHub',
        link: 'https://github.com/Supermilk-Niuru',
        style: 'text-sm'
      }
    ],
    credits: true,
    social: { github: 'https://github.com/Supermilk-Niuru' }
  },

  content: {
    externalLinks: {
      content: ' ↗',
      properties: { style: 'user-select:none' }
    },
    blogPageSize: 8,
    share: ['weibo', 'x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  links: {
    logbook: [
      { date: '2025-03-16', content: '欢迎来到我的博客！' }
    ],
    applyTip: [
      { name: '名称', val: theme.title },
      { name: '描述', val: theme.description || 'Null' },
      { name: '链接', val: 'https://my-blog-six-nu.vercel.app/' },
      { name: '头像', val: 'https://my-blog-six-nu.vercel.app/favicon/favicon.ico' }
    ],
    cacheAvatar: false
  },

  pagefind: true,

  quote: {
    server: 'https://dummyjson.com/quotes/random',
    target: `(data) => (data.quote.length > 80 ? \`\${data.quote.slice(0, 80)}...\` : data.quote || 'Error')`
  },

  typography: {
    class: 'prose text-base',
    blockquoteStyle: 'italic',
    inlineCodeBlockStyle: 'modern'
  },

  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: { className: 'zoomable' }
  },

  waline: {
    enable: false,
    server: 'https://astro-theme-pure-waline.arthals.ink/',
    showMeta: false,
    emoji: ['bmoji', 'weibo'],
    additionalConfigs: {
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Like',
        placeholder: '欢迎留言（填写邮箱可接收回复通知，无需登录）'
      },
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: '站点条款',
  list: [
    { title: '隐私政策', link: '/terms/privacy-policy' },
    { title: '服务条款', link: '/terms/terms-and-conditions' },
    { title: '版权声明', link: '/terms/copyright' },
    { title: '免责声明', link: '/terms/disclaimer' }
  ]
}

const config = { ...theme, integ } as Config
export default config
