<script setup lang="ts">
/**
 * Projects 页面
 * 项目卡片展示网格
 * 数据直接写在页面里，手动维护
 */

const projects = [
  {
    title: 'EEG Conformer Reproduction',
    description: 'Reproducing the EEG Conformer paper: a compact CNN-Transformer architecture for EEG decoding.',
    tags: ['PyTorch', 'EEG', 'Transformer'],
    url: 'https://github.com/Supermilk-Niuru/EEG-Conformer-Reproduction',
    status: 'In Progress',
  },
  {
    title: 'Personal Blog',
    description: 'This blog — built with Valaxy, Vue 3, and Catppuccin styling.',
    tags: ['Vue 3', 'Valaxy', 'TypeScript'],
    url: 'https://github.com/supermilk-niuru',
    status: 'Active',
  },
  // 以后在这里加新项目
]

// 占位：将来更多项目
const placeholders = 2
</script>

<template>
  <div class="projects-page">
    <h1 class="page-title">{{ $t('projects.title') }}</h1>

    <div class="project-grid">
      <article v-for="p in projects" :key="p.title" class="project-card">
        <div class="card-header">
          <h2 class="card-title">{{ p.title }}</h2>
          <span class="card-status" :class="p.status.toLowerCase().replace(' ', '-')">
            {{ p.status }}
          </span>
        </div>
        <p class="card-desc">{{ p.description }}</p>
        <div class="card-tags">
          <span v-for="tag in p.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <a
          v-if="p.url"
          :href="p.url"
          target="_blank"
          rel="noopener"
          class="card-link"
        >
          View on GitHub →
        </a>
      </article>

      <!-- 占位卡片 -->
      <article
        v-for="i in placeholders"
        :key="i"
        class="project-card placeholder"
      >
        <p class="placeholder-text">More projects coming soon...</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  max-width: 720px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.25rem;
  transition: all 0.15s ease;
}
.project-card:hover {
  border-color: var(--ctp-surface2);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.card-status {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.card-status.in-progress {
  color: var(--ctp-yellow);
  background: rgba(249, 226, 175, 0.12);
}
.card-status.active {
  color: var(--ctp-green);
  background: rgba(166, 227, 161, 0.12);
}

.card-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.tag {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--ctp-mauve);
  background: rgba(203, 166, 247, 0.1);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.card-link {
  font-size: 0.82rem;
  font-weight: 500;
}

/* 占位 */
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.35;
  border-style: dashed;
}
.placeholder-text {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: italic;
}

@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
