import { defineValaxyConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-yun'

/**
 * Valaxy 框架配置
 * 这里配置框架级行为：SSG、RSS、搜索、插件等
 * 项目初期配好后基本不动
 */
export default defineValaxyConfig<ThemeConfig>({
  theme: 'yun',

  siteConfig: {
    lang: 'zh-CN',
    languages: ['zh-CN', 'en'],
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

  // RSS 配置
  feed: {
    name: 'Supermilk-Niuru',
    favicon: '/favicon.ico',
  },

  // 搜索配置
  search: {
    enable: true,
    provider: 'local',
  },

  // 数学公式
  katex: {
    enable: true,
  },

  // 评论（暂时不用）
  comment: {
    enable: false,
  },

  // 文章排序
  orderBy: 'date',
  lastUpdated: true,
})
