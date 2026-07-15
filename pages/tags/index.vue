<script setup lang="ts">
/**
 * Tags 页面
 * 展示所有标签，点击标签查看对应文章
 */
import { computed, ref } from 'vue'
import { useSiteStore } from 'valaxy'

const siteStore = useSiteStore()

// 收集所有标签及其文章数
const tagsMap = computed(() => {
  const map = new Map<string, { count: number; posts: any[] }>()
  const list = siteStore.postList || [] as any[]
  list.forEach((post: any) => {
    if (post.tags) {
      const tagArr = Array.isArray(post.tags) ? post.tags : [post.tags]
      tagArr.forEach((tag: string) => {
        if (!map.has(tag)) {
          map.set(tag, { count: 0, posts: [] })
        }
        const entry = map.get(tag)!
        entry.count++
        entry.posts.push(post)
      })
    }
  })
  return map
})

const sortedTags = computed(() => {
  return Array.from(tagsMap.value.entries()).sort(([a], [b]) => a.localeCompare(b))
})

const selectedTag = ref('')
const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  const entry = tagsMap.value.get(selectedTag.value)
  return entry?.posts || []
})

function selectTag(tag: string) {
  selectedTag.value = tag === selectedTag.value ? '' : tag
}
</script>

<template>
  <div class="tags-page">
    <h1 class="page-title">Tags</h1>

    <!-- 标签云 -->
    <div class="tags-cloud">
      <button
        v-for="[tag, info] in sortedTags"
        :key="tag"
        class="tag-btn"
        :class="{ active: selectedTag === tag }"
        @click="selectTag(tag)"
      >
        #{{ $t('tag.' + tag) || tag }}
        <span class="tag-count">{{ info.count }}</span>
      </button>
      <p v-if="!sortedTags.length" class="empty-text">No tags yet.</p>
    </div>

    <!-- 选中标签的文章列表 -->
    <div v-if="selectedTag" class="filtered-posts">
      <h2 class="filter-heading">
        {{ $t('blog.filteredByTag') }} <strong>#{{ $t('tag.' + selectedTag) || selectedTag }}</strong>
      </h2>
      <div class="post-list">
        <article v-for="post in filteredPosts" :key="post.path" class="post-item">
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
.tags-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tag-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.7rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'JetBrains Mono', monospace;
}
.tag-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}
.tag-btn.active {
  color: var(--ctp-base);
  background: var(--accent);
  border-color: var(--accent);
}

.tag-count {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.tag-btn.active .tag-count {
  color: var(--ctp-base);
  opacity: 0.7;
}

.filter-heading {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.filtered-posts {
  margin-top: 1rem;
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
}

.empty-text {
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.88rem;
}
</style>
