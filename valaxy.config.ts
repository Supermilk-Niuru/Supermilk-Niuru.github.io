import { defineValaxyConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-yun'

/**
 * Valaxy 框架配置
 * search、feed、comment、orderBy、lastUpdated 均属于 siteConfig
 * katex 在顶层 features 中，默认已启用
 */
export default defineValaxyConfig<ThemeConfig>({
  theme: 'yun',

  siteConfig: {
    lang: 'zh-CN',
    languages: ['zh-CN', 'en'],

    // 文章排序
    orderBy: 'date',
    lastUpdated: true,

    // RSS 配置
    feed: {
      name: 'Supermilk-Niuru',
      favicon: '/favicon.ico',
    },

    // 搜索配置（使用 Valaxy 本地 MiniSearch）
    search: {
      enable: true,
      provider: 'local',
    },

    // 评论（暂时不用）
    comment: {
      enable: false,
    },
  },

  themeConfig: {
    // 禁用 yun 主题的默认 banner，我们完全自定义首页
    banner: {
      enable: false,
    },
    // 禁用不必要的功能
    notice: false,
    tags: true,
    categories: true,
    archive: true,
    say: false,
  },

  // 数学公式（在顶层 features 中，默认已启用）
  katex: {
    enable: true,
  },
})
