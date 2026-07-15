<script setup lang="ts">
/**
 * 文章详情页布局
 * 左侧：文章内容
 * 右侧：悬浮目录（TOC）—— 仅在宽屏显示，自动解析文章标题
 */
</script>

<template>
  <div class="layout-post">
    <AppNav />
    <main class="post-body">
      <!-- 文章内容 -->
      <article class="article-content">
        <RouterView />
      </article>

      <!-- 悬浮目录 -->
      <aside class="toc-area">
        <div class="toc-sticky">
          <YunOutline />
        </div>
      </aside>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout-post {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.post-body {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 3rem;
  display: flex;
  gap: 2rem;
}

/* 文章内容区 */
.article-content {
  flex: 1;
  min-width: 0;   /* 防止 flex 溢出 */
  max-width: 900px;
}

/* ===== 右侧 TOC 区 ===== */
.toc-area {
  display: none;   /* 默认隐藏 */
  width: 120px;
  flex-shrink: 0;
}

.toc-sticky {
  position: sticky;
  top: 80px;       /* 导航栏高度 56px + 留白 */
}

/* 覆盖 YunOutline 样式使其更简洁 */
.toc-sticky :deep(.outline-title) {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.toc-sticky :deep(.va-toc) {
  font-size: 0.82rem;
  line-height: 1.6;
}

.toc-sticky :deep(.va-toc a) {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.12s;
  display: block;
  padding: 0.15rem 0;
  border-left: 2px solid transparent;
  padding-left: 0.75rem;
}

.toc-sticky :deep(.va-toc a:hover) {
  color: var(--text-primary);
}

.toc-sticky :deep(.va-toc a.active) {
  color: var(--accent);
  border-left-color: var(--accent);
}

/* 二级标题缩进 */
.toc-sticky :deep(.va-toc .toc-item-2) {
  padding-left: 1.25rem;
  font-size: 0.78rem;
}

/* 隐藏 yun 主题的 marker（我们用 border-left 高亮） */
.toc-sticky :deep(.outline-marker) {
  display: none !important;
}

/* 隐藏 yun 主题内置的 content padding-left */
.toc-sticky :deep(.content) {
  padding-left: 0 !important;
}

/* ===== 桌面端显示 TOC ===== */
@media (min-width: 1024px) {
  .toc-area {
    display: block;
  }
}

/* ===== 移动端窄屏 ===== */
@media (max-width: 640px) {
  .post-body {
    padding: 1rem 1rem 2rem;
  }
}
</style>
