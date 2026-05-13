# Niuru's Blog 使用指南

本文档教你如何修改和维护这个基于 **Astro + astro-pure** 的博客网站。

---

## 一、项目结构

```
src/
├── content/blog/         # ← 你的博客文章（Markdown）
├── components/           # ← 自定义组件
│   ├── home/             #   主页相关组件
│   ├── about/            #   关于页组件
│   ├── projects/         #   项目页组件
│   └── links/            #   友链页组件
├── layouts/              # ← 页面布局模板
│   ├── BaseLayout.astro  #   所有页面公用布局
│   ├── BlogPost.astro    #   中文博客文章布局
│   ├── BlogPostEn.astro  #   英文博客文章布局
│   └── CommonPage.astro  #   普通页面布局
├── pages/                # ← 页面路由
│   ├── index.astro       #   中文主页
│   ├── blog/[...page].astro  # 中文博客列表
│   ├── about/index.astro     # 中文关于页
│   ├── projects/index.astro  # 中文项目页
│   ├── links/index.astro     # 中文友链页
│   ├── en/               #   英文版页面
│   │   ├── index.astro       # 英文主页
│   │   ├── blog/[...page].astro  # 英文博客列表
│   │   ├── about/index.astro     # 英文关于页
│   │   ├── projects/index.astro  # 英文项目页
│   │   └── links/index.astro     # 英文友链页
│   ├── archives/         #   归档页面
│   ├── tags/             #   标签页面
│   └── search/           #   搜索页面
├── assets/
│   ├── styles/
│   │   ├── app.css       # ← 自定义样式
│   │   └── global.css    # ← 全局样式
│   └── tools/            #   工具图标
├── site.config.ts        # ← 网站主要配置文件
└── astro.config.ts       #   Astro 配置文件
```

---

## 二、写博客文章

### 2.1 新建文章

在 `src/content/blog/` 目录下创建 `.md` 文件，例如 `my-post.md`：

```markdown
---
title: "文章标题"
publishDate: "2026-05-13"
description: "文章简介，会显示在卡片和搜索引擎中"
category: "技术"     # 分类（可修改）
tags: ["技术", "Astro"]  # 标签
---

这里是文章正文，使用 Markdown 格式。

## 二级标题

段落内容...
```

### 2.2 支持哪些内容

- Markdown 基本语法（标题、加粗、列表、链接、图片等）
- 代码块（自动语法高亮）
- KaTeX 数学公式（用 `$$` 包裹）
- 表格
- 引用

### 2.3 分类与标签

- **分类 (category)**：每篇文章只能有一个分类。已在 `/blog` 列表页右侧显示。
- **标签 (tags)**：每篇文章可以有多个标签，用数组表示：`["标签1", "标签2"]`

### 2.4 修改已有文章

直接编辑 `src/content/blog/` 下的 `.md` 文件，修改 frontmatter（`---` 之间的内容）或正文即可。

> ⚠️ 修改后需要重新运行 `npm run dev` 或等待 HMR 更新。

---

## 三、网站配置 (`src/site.config.ts`)

这是网站的核心配置文件，修改后**必须重启 dev server** 才能生效。

### 3.1 修改导航栏菜单

找到 `header.menu` 部分：

```typescript
header: {
  menu: [
    { title: 'Home', link: '/' },      // 首页
    { title: 'Blog', link: '/blog' },  // 博客列表
    { title: 'Projects', link: '/projects' },
    { title: 'Links', link: '/links' },
    { title: 'About', link: '/about' },
    // 想添加新菜单？直接加一行：
    { title: 'Archive', link: '/archives' },
  ]
}
```

> 菜单会自动同步到英文版页面（通过 JS 自动加 `/en` 前缀），所以你只需要写中文路径。

### 3.2 修改页脚

找到 `footer` 部分：

```typescript
footer: {
  links: [
    { title: 'GitHub', link: 'https://github.com/Supermilk-Niuru', style: 'text-sm' }
    // 可以加更多链接：
    // { title: 'Twitter', link: 'https://twitter.com/xxx', style: 'text-sm' }
  ],
  social: { github: 'https://github.com/Supermilk-Niuru' }
  // 还有其他社交平台：twitter, bluesky, weibo 等
}
```

### 3.3 修改网站基本信息

```typescript
title: "Niuru's blog",       // 浏览器标签栏显示的标题
author: 'Supermilk-Niuru',   // 作者名
description: 'Stay hungry, stay foolish',  // 网站描述
```

### 3.4 修改友链信息

找到 `integ.links` 部分，修改 `applyTip` 里的信息：

```typescript
applyTip: [
  { name: '名称', val: theme.title },
  { name: '描述', val: theme.description || 'Null' },
  { name: '链接', val: 'https://my-blog-six-nu.vercel.app/' },
  { name: '头像', val: 'https://my-blog-six-nu.vercel.app/favicon/favicon.ico' }
]
```

### 3.5 修改日志（logbook）

```typescript
logbook: [
  { date: '2025-03-16', content: '欢迎来到我的博客！' }
  // 添加新记录：
  // { date: '2026-05-13', content: '更新了博客样式' }
]
```

---

## 四、修改主页 (`src/pages/index.astro` 和 `src/pages/en/index.astro`)

### 4.1 主页包含的内容

主页分为几个区块：
1. **头像和作者信息** — 在 `site.config.ts` 中配置
2. **关于** — 描述文字，可修改
3. **教育经历** — 可修改学校、专业、时间
4. **统计** — 自动生成，包含：
   - 在线天数（从第一篇博客开始计算）
   - 最后更新日期
   - 总字数
   - 文章总数
   - **贡献格子**（类似 GitHub 小绿框）

### 4.2 修改主页内容

直接编辑 `src/pages/index.astro`（中文版）或 `src/pages/en/index.astro`（英文版）。

例如修改"关于"部分：

```astro
<Section title="关于">
  <p class="text-muted-foreground">你的新描述</p>
</Section>
```

### 4.3 管理贡献格子

贡献格子组件在 `src/components/home/ContributionGrid.astro`。

格子颜色定义在 `src/assets/styles/app.css` 中，从 level 0（无贡献）到 level 4（最多贡献）。如果你想修改颜色，找到以下内容修改即可：

```css
.contribution-cell[data-level="1"] {
  background-color: #c6e48b;  /* 改为你想要的颜色 */
}
```

---

## 五、英文版页面

本站支持中英文双语。英文版页面在 `src/pages/en/` 目录下。

**修改英文版需要注意**：
- 每个中文页面都有对应的英文版
- 修改中文版后，记得同步修改英文版
- 链接部分：如果不确定，写中文路径即可，网页会自动加 `/en` 前缀

---

## 六、添加新页面

1. 在 `src/pages/` 下创建文件夹，如 `src/pages/gallery/`
2. 创建 `index.astro` 文件：

```astro
---
import PageLayout from '@/layouts/CommonPage.astro'
---

<PageLayout title="页面标题">
  <h2>内容标题</h2>
  <p>页面内容...</p>
</PageLayout>
```

3. 在 `site.config.ts` 的 `header.menu` 中添加导航链接：
```typescript
{ title: 'Gallery', link: '/gallery' },
```

4. 如果需要英文版，在 `src/pages/en/gallery/index.astro` 创建对应页面。

---

## 七、修改样式

### 7.1 全局颜色

编辑 `src/assets/styles/app.css`，修改 `:root` 和 `.dark` 中的 CSS 变量：

- `--primary`: 主题色
- `--background`: 背景色
- `--foreground`: 文字颜色
- `--muted-foreground`: 次要文字颜色

### 7.2 贡献格子颜色

同上文件，找到 `.contribution-cell[data-level="0-4"]` 修改。

---

## 八、开发与部署

### 8.1 本地开发

```bash
# 启动开发服务器（修改 site.config.ts 后需要重启）
npm run dev

# 构建预览
npm run build && npm run preview
```

> ⚠️ 修改 `site.config.ts` 或 `astro.config.ts` 后必须**完全关闭 dev server**（按 Ctrl+C）再重新 `npm run dev`，因为 HMR 不支持这些文件。

### 8.2 部署到 Vercel

```bash
# 提交代码
git add .
git commit -m "你的修改说明"
git push
```

推送到 GitHub 后，Vercel 会自动部署。部署地址：`https://my-blog-six-nu.vercel.app/`

---

## 九、常见操作速查

| 想做什么 | 修改哪个文件 |
|---------|------------|
| 写新博客 | `src/content/blog/新建文件.md` |
| 改导航菜单 | `src/site.config.ts` → `header.menu` |
| 改主页内容 | `src/pages/index.astro` |
| 改英文主页 | `src/pages/en/index.astro` |
| 改关于页 | `src/pages/about/index.astro` |
| 改英文关于页 | `src/pages/en/about/index.astro` |
| 改友链 | `src/pages/links/index.astro` |
| 改网站标题/描述 | `src/site.config.ts` → `title` / `description` |
| 改颜色主题 | `src/assets/styles/app.css` |
| 改页脚 | `src/site.config.ts` → `footer` |
| 添加新页面 | `src/pages/新文件夹/index.astro` |

---

有任何问题，直接问我即可！
