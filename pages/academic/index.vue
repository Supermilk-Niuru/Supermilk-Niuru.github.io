<script setup lang="ts">
/**
 * Academic 页面
 * 学术经历时间线 + 论文阅读列表 + 技能
 */
import { useSiteStore } from 'valaxy'
import { computed } from 'vue'

const siteStore = useSiteStore()

function localize(val: string | Record<string, string> | undefined): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  const lang = localStorage.getItem('valaxy-lang') || 'zh-CN'
  return val[lang] || val['zh-CN'] || ''
}

// Research 分类的文章
const researchPosts = computed(() => {
  const list = siteStore.postList || [] as any[]
  return list
    .filter((p: any) => {
      const cats = p.categories
      if (!cats) return false
      if (Array.isArray(cats)) return cats.includes('Research')
      return cats === 'Research'
    })
    .sort((a: any, b: any) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
})

// 研究经历（手动维护）
const experiences = [
  {
    period: '2025 - Present',
    title: '待填写：实验室/研究项目',
    description: '在这里描述你的研究经历...',
  },
]

// 技能
const skills = [
  { name: 'Python', level: 70 },
  { name: 'PyTorch', level: 55 },
  { name: 'EEG Processing', level: 45 },
  { name: 'Machine Learning', level: 50 },
  { name: 'C / C++', level: 40 },
  { name: 'Vue / TypeScript', level: 45 },
]
</script>

<template>
  <div class="academic-page">
    <h1 class="page-title">{{ $t('academic.title') }}</h1>

    <!-- 研究经历 -->
    <section class="section">
      <h2 class="section-title">{{ $t('academic.researchExperience') }}</h2>
      <div class="timeline">
        <div v-for="exp in experiences" :key="exp.title" class="timeline-item">
          <div class="timeline-dot" />
          <div class="timeline-content">
            <span class="timeline-period">{{ exp.period }}</span>
            <h3 class="timeline-title">{{ exp.title }}</h3>
            <p class="timeline-desc">{{ exp.description }}</p>
          </div>
        </div>
        <div class="timeline-item timeline-empty">
          <div class="timeline-dot" />
          <div class="timeline-content">
            <p class="empty-text">More to come...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 论文阅读 -->
    <section class="section">
      <h2 class="section-title">{{ $t('academic.papers') }}</h2>
      <div v-if="researchPosts.length" class="paper-list">
        <article
          v-for="post in researchPosts"
          :key="post.path"
          class="paper-item"
        >
          <!-- ★ 修复：使用 post.path 作为路由 -->
          <RouterLink :to="post.path || '/'" class="paper-link">
            <span class="paper-icon">📄</span>
            <div class="paper-info">
              <span class="paper-title">{{ localize(post.title) }}</span>
              <span v-if="post.tags?.length" class="paper-tags">
                {{ post.tags.join(' · ') }}
              </span>
            </div>
            <span class="paper-date">{{ post.date?.slice(0, 10) }}</span>
          </RouterLink>
        </article>
      </div>
      <p v-else class="empty-section">
        Research papers coming soon...
      </p>
    </section>

    <!-- 技能 -->
    <section class="section">
      
    </section>
  </div>
</template>

<style scoped>
.academic-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* ===== 时间线 ===== */
.timeline {
  border-left: 2px solid var(--border-color);
  padding-left: 1.25rem;
}

.timeline-item {
  position: relative;
  padding-bottom: 1.5rem;
}

.timeline-dot {
  position: absolute;
  left: -1.45rem;
  top: 0.35rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--bg-primary);
}

.timeline-period {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 500;
  font-family: 'JetBrains Mono', monospace;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.2rem 0;
}

.timeline-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.timeline-empty .timeline-dot {
  background: var(--ctp-surface1);
}

.empty-text {
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.88rem;
}

/* ===== 论文列表 ===== */
.paper-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.paper-item {
  border-bottom: 1px solid var(--border-color);
}
.paper-item:last-child { border-bottom: none; }

.paper-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0;
  text-decoration: none;
  color: inherit;
  transition: color 0.1s;
}
.paper-link:hover { color: var(--accent); }

.paper-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.paper-info {
  flex: 1;
  min-width: 0;
}

.paper-title {
  display: block;
  font-size: 0.92rem;
  font-weight: 500;
}

.paper-tags {
  display: block;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}

.paper-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.empty-section {
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.88rem;
  padding: 1rem 0;
}

/* ===== 技能 ===== */
.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.skill-name {
  font-size: 0.88rem;
  font-weight: 500;
}

.skill-level {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.skill-bar {
  height: 6px;
  background: var(--ctp-surface1);
  border-radius: 3px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--ctp-blue), var(--ctp-lavender));
  border-radius: 3px;
  transition: width 0.5s ease;
}
</style>
