import { $t, defineSiteConfig } from 'valaxy'

/**
 * 站点信息配置
 * 这里填你的个人信息、社交链接、站点描述
 * 换信息时改这里就行
 */
export default defineSiteConfig({
  url: 'https://supermilk-niuru.github.io',
  lang: 'zh-CN',
  title: 'Supermilk-Niuru',
  subtitle: 'Computer Science Student',
  description: 'Personal knowledge garden and growth archive',

  author: {
    name: 'Supermilk-Niuru',
    email: 'your-email@example.com',
    avatar: '/avatar.jpg',
    status: {
      emoji: '🌱',
      text: 'Growing',
    },
    intro: [
      'Computer Science Student',
      'AI · Deep Learning · BCI',
    ],
  },

  social: [
    {
      name: 'GitHub',
      icon: 'i-ri-github-fill',
      url: 'https://github.com/supermilk-niuru',
      color: '#cdd6f4',
    },
    {
      name: 'Email',
      icon: 'i-ri-mail-fill',
      url: 'mailto:Ubermilk666@163.com',
      color: '#f38ba8',
    },
    {
      name: 'Bilibili',
      icon: 'i-ri-bilibili-fill',
      url: 'https://space.bilibili.com/3546916507880260',
      color: '#89b4fa',
    },
    {
      name: 'rednote',
      icon: 'i-ri-book-2-fill',
      url: 'https://www.xiaohongshu.com/user/profile/6850c687000000001d00b41b',
      color: '#fab387',
    },
    {
      name: 'TikTok',
      icon: 'i-ri-tiktok-fill',
      url: 'https://tiktok.com/@your-id',
      color: '#cdd6f4',
    },
    {
      name: 'Google Scholar',
      icon: 'i-ri-google-fill',
      url: 'https://scholar.google.com/citations?user=your-id',
      color: '#a6e3a1',
    },
  ],

  license: {
    type: 'by-nc-sa',
  },
})
