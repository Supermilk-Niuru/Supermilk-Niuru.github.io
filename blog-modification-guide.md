# 博客修改说明文档

## 概述

本文档记录了个人博客仿照 [axi404.top](https://axi404.top/) 进行修改的完整说明，包括文件位置、修改内容和后续维护指南。

---

## 一、修改总览

| 修改项 | 说明 | 状态 |
|--------|------|------|
| 导航菜单 | 改为英文（Home, Blog, Projects, Links, About），移除重复搜索入口 | ✅ |
| 中英文切换 | 新增 LanguageSwitcher 组件，支持 `/`（中文）和 `/en/`（英文）切换 | ✅ |
| 语言切换器位置 | 从页面右上角浮动改为固定在 Header 夜间模式按钮左侧 | ✅ |
| 英文博客文章详情 | 新增 `/en/blog/[...id].astro`，支持英文界面下查看文章详情 | ✅ |
| 英文标签详情页 | 新增 `/en/tags/[tag]/[...page].astro`，支持英文界面下查看标签筛选 | ✅ |
| HTML lang 动态切换 | 英文页面自动使用 `lang="en"`，Pagefind 现可识别中英双语 | ✅ |
| 修复英文页 Prop 错误 | ProjectSection/FriendList/ToolSection 传递错误 props 导致页面崩溃 | ✅ |
| 文件结构整理 | 清理无用组件和文档 | ✅ |

---

## 二、文件结构与说明

```
My-blog/
├── src/
│   ├── assets/                  # 静态资源（图片、样式）
│   │   ├── styles/app.css       # 主题样式、滚动条、贡献图样式
│   │   ├── tools/               # 工具图标 SVG
│   │   ├── avatar.png           # 头像
│   │   ├── alipay-qrcode.jpg    # 支付宝收款码
│   │   └── wechat-qrcode.jpg    # 微信收款码
│   │
│   ├── components/              # 可复用组件
│   │   ├── home/
│   │   │   └── Section.astro    # 首页分区组件
│   │   ├── about/
│   │   │   ├── Substats.astro   # 统计数据组件
│   │   │   └── ToolSection.astro# 工具列表组件
│   │   ├── links/
│   │   │   └── FriendList.astro # 友链列表组件
│   │   ├── projects/
│   │   │   ├── ProjectSection.astro
│   │   │   ├── Sponsors.astro
│   │   │   └── Sponsorship.astro
│   │   ├── waline/              # 评论系统组件（当前禁用）
│   │   ├── BaseHead.astro       # HTML <head> 配置
│   │   └── LanguageSwitcher.astro # ⭐ 中英文切换按钮（Header 内）
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro     # ⭐ 基础布局（所有页面共用，含语言切换脚本）
│   │   ├── BlogPost.astro       # 博客文章布局（中文版）
│   │   ├── BlogPostEn.astro     # ⭐ 博客文章布局（英文版，回退到 /en/blog）
│   │   ├── CommonPage.astro     # 通用页面布局
│   │   ├── ContentLayout.astro  # 内容页面布局
│   │   └── IndividualPage.astro # 独立页面布局
│   │
│   ├── pages/                   # ⭐ 页面文件（URL 路径对应）
│   │   ├── index.astro          # 首页（中文）
│   │   ├── 404.astro            # 404 页面
│   │   ├── about/index.astro    # 关于页面（中文）
│   │   ├── archives/index.astro # 归档页面（中文）
│   │   ├── blog/
│   │   │   ├── [...page].astro  # 博客列表（中文）
│   │   │   └── [...id].astro    # 博客文章详情（中文）
│   │   ├── links/index.astro    # 友链页面（中文）
│   │   ├── projects/index.astro # 项目页面（中文）
│   │   ├── search/index.astro   # 搜索页面
│   │   ├── tags/
│   │   │   ├── index.astro      # 标签页面（中文）
│   │   │   └── [tag]/[...page].astro # 标签详情（中文）
│   │   ├── terms/               # 站点条款页面
│   │   ├── rss.xml.ts           # RSS 订阅
│   │   ├── robots.txt.ts        # Robots 配置
│   │   └── en/                  # ⭐ 英文版页面
│   │       ├── index.astro      # 英文首页
│   │       ├── about/index.astro
│   │       ├── archives/index.astro
│   │       ├── blog/
│   │       │   ├── [...page].astro  # 博客列表（英文）
│   │       │   └── [...id].astro    # ⭐ 博客文章详情（英文）
│   │       ├── links/index.astro
│   │       ├── projects/index.astro
│   │       ├── search/index.astro
│   │       ├── tags/
│   │       │   ├── index.astro      # 标签页面（英文）
│   │       │   └── [tag]/[...page].astro # ⭐ 标签详情（英文）
│   │
│   ├── content/
│   │   └── blog/                # ⭐ 博客文章（Markdown）
│   │       ├── first.md
│   │       ├── hello-world.md
│   │       └── markdown-guide.md
│   │
│   ├── plugins/                 # Astro 插件（无需修改）
│   ├── content.config.ts        # 内容集合配置
│   ├── site.config.ts           # ⭐ 站点核心配置
│   └── type.d.ts
│
├── astro.config.ts              # ⭐ Astro 构建配置
├── uno.config.ts                # UnoCSS 配置
├── blog-modification-guide.md   # 本文档
└── package.json
```

> ⭐ 标记为常用修改位置

---

## 三、核心配置修改

### [src/site.config.ts](src/site.config.ts) — 站点配置

| 配置项 | 说明 | 修改位置 |
|--------|------|----------|
| `title` | 博客标题 | 第5行 |
| `author` | 作者名 | 第6行 |
| `description` | 博客描述 | 第7行 |
| `header.menu` | ⭐ 导航菜单项 | 第33-39行 |
| `footer` | 页脚信息 | 第43-54行 |
| `integ.waline` | 评论系统配置 | 第99-113行 |
| `integ.pagefind` | 搜索功能开关 | 第82行 |
| `content.blogPageSize` | 每页文章数 | 第64行 |

### [astro.config.ts](astro.config.ts) — 构建配置

| 配置项 | 说明 | 修改位置 |
|--------|------|----------|
| `site` | 网站部署 URL | 第28行 |
| `adapter` | 部署适配器 | 第38行 |
| `output` | 输出模式 | 第39行 |

---

## 四、页面内容修改指南

### 4.1 导航菜单

修改 [src/site.config.ts](src/site.config.ts) 第33-39行的 `header.menu` 数组：

```ts
header: {
  menu: [
    { title: 'Home', link: '/' },
    { title: 'Blog', link: '/blog' },
    { title: 'Projects', link: '/projects' },
    { title: 'Links', link: '/links' },
    { title: 'About', link: '/about' }
  ]
}
```

> 注意：搜索图标（🔍）由 Header 组件自动渲染，不需要在 menu 中添加

### 4.2 首页内容

**中文首页**：[src/pages/index.astro](src/pages/index.astro)
- 个人信息（名字、位置、GitHub）：第37-52行
- 关于区域：第56-65行
- 教育经历：第67-75行
- 统计数据：第77-100行
- 最新文章列表：第102-115行

**英文首页**：[src/pages/en/index.astro](src/pages/en/index.astro)
- 目录结构与中文版相同，内容为英文

### 4.3 关于页面

**中文**：[src/pages/about/index.astro](src/pages/about/index.astro)
**英文**：[src/pages/en/about/index.astro](src/pages/en/about/index.astro)

包含自我介绍、常用工具、社交网络。

### 4.4 博客文章

所有博客文章位于 [src/content/blog/](src/content/blog/) 目录，使用 Markdown 格式：

```markdown
---
title: "文章标题"
publishDate: "2026-01-15"
description: "文章描述"
tags: ["标签1", "标签2"]
---

## 正文内容
```

**添加新文章**：在 `src/content/blog/` 下创建新的 `.md` 文件即可，自动出现在首页和博客列表。

### 4.5 博客文章详情页

中英文版使用不同的布局文件：
- **中文版**：[src/layouts/BlogPost.astro](src/layouts/BlogPost.astro) — 返回按钮链接到 `/blog`
- **英文版**：[src/layouts/BlogPostEn.astro](src/layouts/BlogPostEn.astro) — 返回按钮链接到 `/en/blog`
- **中文详情页**：[src/pages/blog/[...id].astro](src/pages/blog/[...id].astro)
- **英文详情页**：[src/pages/en/blog/[...id].astro](src/pages/en/blog/[...id].astro)

### 4.6 搜索页面

**中文**：[src/pages/search/index.astro](src/pages/search/index.astro)
**英文**：[src/pages/en/search/index.astro](src/pages/en/search/index.astro)

搜索功能使用 Pagefind，在 `src/site.config.ts` 第82行通过 `integ.pagefind` 控制开关。

### 4.7 其他页面

所有页面的中文版和英文版都放在对应的 `pages/` 和 `pages/en/` 目录下，修改时需同时修改两个版本。

| 页面 | 中文 | 英文 |
|------|------|------|
| 归档 | [src/pages/archives/index.astro](src/pages/archives/index.astro) | [src/pages/en/archives/index.astro](src/pages/en/archives/index.astro) |
| 标签列表 | [src/pages/tags/index.astro](src/pages/tags/index.astro) | [src/pages/en/tags/index.astro](src/pages/en/tags/index.astro) |
| 标签详情 | [src/pages/tags/[tag]/[...page].astro](src/pages/tags/%5Btag%5D/[...page].astro) | [src/pages/en/tags/[tag]/[...page].astro](src/pages/en/tags/%5Btag%5D/[...page].astro) |
| 友链 | [src/pages/links/index.astro](src/pages/links/index.astro) | [src/pages/en/links/index.astro](src/pages/en/links/index.astro) |
| 项目 | [src/pages/projects/index.astro](src/pages/projects/index.astro) | [src/pages/en/projects/index.astro](src/pages/en/projects/index.astro) |
| 404 | [src/pages/404.astro](src/pages/404.astro) | 无（共用） |

---

## 五、中英文切换机制

### 工作原理

1. **LanguageSwitcher 组件**：[src/components/LanguageSwitcher.astro](src/components/LanguageSwitcher.astro)
   - 渲染为 Header 内的一个按钮，位于夜间模式（Dark Mode）按钮的左侧
   - 自动识别当前路径，切换 `/` 和 `/en/` 前缀
   - 中文页面显示 "EN" 按钮，英文页面显示 "中" 按钮

2. **移动逻辑**：[BaseLayout.astro](src/layouts/BaseLayout.astro) 第95-104行
   - 组件先在隐藏容器中渲染
   - 页面加载后通过 script 将其移动到 Header 按钮区

3. **HTML lang 动态切换**：[BaseLayout.astro](src/layouts/BaseLayout.astro) 第20-21行
   - 自动检测 URL 是否以 `/en` 开头
   - 英文页面使用 `lang="en"`，中文页面使用 `lang="zh-CN"`
   - 这使 Pagefind 能正确识别页面语言

4. **所有页面共享同一个 `BaseLayout`**

### 语言切换覆盖范围

| 页面类型 | 中文路径 | 英文路径 | 状态 |
|---------|---------|---------|------|
| 首页 | `/` | `/en/` | ✅ |
| 博客列表 | `/blog` | `/en/blog` | ✅ |
| 博客文章 | `/blog/:id` | `/en/blog/:id` | ✅ |
| 归档 | `/archives` | `/en/archives` | ✅ |
| 标签列表 | `/tags` | `/en/tags` | ✅ |
| 标签筛选 | `/tags/:tag` | `/en/tags/:tag` | ✅ |
| 关于 | `/about` | `/en/about` | ✅ |
| 项目 | `/projects` | `/en/projects` | ✅ |
| 友链 | `/links` | `/en/links` | ✅ |
| 搜索 | `/search` | `/en/search` | ✅ |
| 条款 | `/terms/*` | ❌ 无英文版 | ❌ |

### 添加新英文页面

如果新增页面（如 `/contact`），需要：
1. 创建中文版：`src/pages/contact/index.astro`
2. 创建英文版：`src/pages/en/contact/index.astro`
3. LanguageSwitcher 会自动处理中英文切换

---

## 六、样式修改

### [src/assets/styles/app.css](src/assets/styles/app.css)

| 样式 | 说明 | 位置 |
|------|------|------|
| `--primary` | 主题色（亮色/暗色） | 变量定义 |
| 滚动条样式 | 薄滚动条 | `::-webkit-scrollbar` |
| 贡献图样式 | GitHub 风格贡献网格 | `.contribution-grid` 类 |

---

## 七、中英文对照表

| 中文 | English | 位置 |
|------|---------|------|
| 首页 | Home | 导航菜单 |
| 博客 | Blog | 导航菜单 |
| 项目 | Projects | 导航菜单 |
| 友链 | Links | 导航菜单 |
| 关于 | About | 导航菜单 |
| 搜索 | Search | 搜索页面 |
| 归档 | Archives | 归档页面 |
| 标签 | Tags | 标签页面 |
| 查看全部 | View all | 首页按钮 |
| 了解更多 | Learn more | 首页按钮 |
| 返回首页 | Back to Home | 通用按钮 |
| 在线天数 | Days Online | 统计 |
| 总字数 | Total Words | 统计 |
| 文章总数 | Total Posts | 统计 |
| 暂无文章 | No posts yet | 空状态 |

---

## 八、后续维护

### 快速修改速查

| 想修改什么 | 改哪个文件 |
|-----------|-----------|
| 博客标题/描述 | `src/site.config.ts` |
| 导航菜单 | `src/site.config.ts` 第33行 |
| 首页个人信息 | `src/pages/index.astro` 第37行 |
| 首页统计数据 | `src/pages/index.astro` 第77行 |
| 关于页面内容 | `src/pages/about/index.astro` |
| 添加新博客 | `src/content/blog/新建文件.md` |
| 主题颜色 | `src/assets/styles/app.css` |
| 网站 URL | `astro.config.ts` 第28行 |
| 英文版内容 | `src/pages/en/` 对应文件 |
| 语言切换按钮 | `src/components/LanguageSwitcher.astro` |
| 英文博客布局 | `src/layouts/BlogPostEn.astro` |
| HTML lang 属性 | `src/layouts/BaseLayout.astro` 第20行 |
| 英文项目页内容 | `src/pages/en/projects/index.astro`（注意传 `projects` 数组） |
| 英文友链页内容 | `src/pages/en/links/index.astro`（注意传 `list` 给 FriendList） |
| 英文关于页内容 | `src/pages/en/about/index.astro`（注意传 `title` 和 `tools` 给 ToolSection） |
| 评论系统 | `src/site.config.ts` 第99行（需启用） |

### 部署

- 项目部署在 Vercel，推送到 GitHub main 分支自动部署
- 部署地址：https://my-blog-six-nu.vercel.app

### 本地预览

```bash
npm run dev     # 启动开发服务器
npm run build   # 构建生产版本
npm run preview # 预览构建结果
```
