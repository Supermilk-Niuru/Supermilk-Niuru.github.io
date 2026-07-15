<script setup lang="ts">
/**
 * Categories 页面
 * 展示所有分类及其文章数
 */
import { computed } from 'vue'
import { useSiteStore } from 'valaxy'

const siteStore = useSiteStore()

const categories = computed(() => {
  const map = new Map<string, { count: number; posts: any[] }>()
  const list = siteStore.postList || [] as any[]
  list.forEach((post: any) => {
    if (post.categories) {
      const cats = Array.isArray(post.categories) ? post.categories : [post.categories]
      cats.forEach((cat: string) => {
        if (!map.has(cat)) {
          map.set(cat, { count: 0, posts: [] })
        }
        const entry = map.get(cat)!
        entry.count++
        entry.posts.push(post)
      })
    }
  })
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
})
</script>

<template>
  <div class="categories-page">
    <h1 class="page-title">Categories</h1>

    <div class="category-list">
      <div v-for="[cat, info] in categories" :key="cat" class="category-item">
        <div class="category-header">
          <span class="category-name">{{ cat }}</span>
          <span class="category-count">{{ info.count }} {{ info.count === 1 ? 'post' : 'posts' }}</span>
        </div>
        <div class="category-posts">
          <article v-for="post in info.posts" :key="post.path" class="post-item">
            <RouterLink :to="post.path || '/'" class="post-link">
              <span class="post-title">{{ post.title }}</span>
              <span class="post-date">{{ post.date?.slice(0, 10) }}</span>
            </RouterLink>
          </article>
        </div>
      </div>
      <p v-if="!categories.length" class="empty-text">No categories yet.</p>
    </div>
  </div>
</template>

<style scoped>
.categories-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.category-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1rem 1.25rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-light);
}

.category-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
}

.category-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.post-item {
  border-bottom: 1px solid var(--border-light);
}
.post-item:last-child { border-bottom: none; }

.post-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.1s;
}
.post-link:hover {
  color: var(--accent);
}

.post-title {
  font-size: 0.9rem;
  font-weight: 500;
}

.post-date {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.empty-text {
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.88rem;
  padding: 2rem 0;
  text-align: center;
}
</style>
