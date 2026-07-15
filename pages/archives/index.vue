<script setup lang="ts">
/**
 * Archives 页面
 * 按时间轴展示所有文章
 */
import { computed } from 'vue'
import { useSiteStore } from 'valaxy'

const siteStore = useSiteStore()

const posts = computed(() => {
  const list = siteStore.postList || [] as any[]
  return [...list].sort((a: any, b: any) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA
  })
})

// 按年份分组
const grouped = computed(() => {
  const groups: Record<string, any[]> = {}
  posts.value.forEach((p: any) => {
    const year = p.date?.slice(0, 4) || 'Unknown'
    if (!groups[year]) groups[year] = []
    groups[year].push(p)
  })
  return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a))
})
</script>

<template>
  <div class="archives-page">
    <h1 class="page-title">Archives</h1>

    <div class="archive-year" v-for="[year, yearPosts] in grouped" :key="year">
      <h2 class="year-heading">{{ year }}</h2>
      <div class="post-list">
        <article v-for="post in yearPosts" :key="post.path" class="post-item">
          <RouterLink :to="post.path || '/'" class="post-link">
            <span class="post-title">{{ post.title }}</span>
            <span class="post-date">{{ post.date?.slice(0, 10) }}</span>
          </RouterLink>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archives-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.archive-year {
  margin-bottom: 2rem;
}

.year-heading {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--border-color);
}

.post-list {
  display: flex;
  flex-direction: column;
}

.post-item {
  border-bottom: 1px solid var(--border-light);
}
.post-item:last-child { border-bottom: none; }

.post-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.1s;
}
.post-link:hover {
  color: var(--accent);
}

.post-title {
  font-size: 0.92rem;
  font-weight: 500;
}

.post-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
  margin-left: 1rem;
}
</style>
