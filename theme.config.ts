import { defineThemeConfig } from 'valaxy-theme-yun'

/**
 * Yun 主题配置
 * 我们主要用 yun 的基础框架，但大量自定义
 */
export default defineThemeConfig({
  // 自定义配色
  colors: {
    primary: '#89b4fa',
    accent: '#b4befe',
  },

  // 页面布局
  layout: 'standard',

  // 页脚
  footer: {
    since: 2025,
    powered: false,
  },
})
