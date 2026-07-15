<script setup lang="ts">
/**
 * Blog 页面
 * 显示所有文章，支持按分类筛选
 * 界面文字跟随语言设置
 */
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useSiteStore } from 'valaxy'

const siteStore = useSiteStore()
const route = useRoute()
const router = useRouter()

/**
 * 解析国际化字段（标题、描述等）
 * 如果字段是字符串直接返回；如果是 { zh-CN, en } 对象，根据当前语言返回对应值
 */
function localize(val: string | Record<string, string> | undefined): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  const lang = (route.query.lang as string) || localStorage.getItem('valaxy-lang') || 'zh-CN'
  return val[lang] || val['zh-CN'] || ''
}

// 所有文章（post.path 是路由路径，如 /posts/hello-world）
const allPosts = computed(() => {
  const list = siteStore.postList || [] as any[]
  return [...list].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA
  })
})

// 当前选中的分类
const activeCategory = computed(() => {
  return (route.query.category as string) || ''
})

// 筛选后的文章
const filteredPosts = computed(() => {
  if (!activeCategory.value) return allPosts.value
  return allPosts.value.filter((p: any) => {
    // categories 可能是字符串或数组，统一处理
    const cats = p.categories
    if (!cats) return false
    if (Array.isArray(cats)) return cats.includes(activeCategory.value)
    return cats === activeCategory.value
  })
})

// 分类列表（去重）
const categories = computed(() => {
  const cats = new Set<string>()
  allPosts.value.forEach((p: any) => {
    if (p.categories) {
      if (Array.isArray(p.categories)) {
        p.categories.forEach((c: string) => cats.add(c))
      } else {
        cats.add(p.categories)
      }
    }
  })
  return Array.from(cats)
})

function setCategory(cat: string) {
  if (cat === activeCategory.value) {
    router.push({ query: {} })
  } else {
    router.push({ query: { category: cat } })
  }
}

function clearFilter() {
  router.push({ query: {} })
}
</script>

<template>
  <div class="blog-page">
    <h1 class="page-title">{{ $t('blog.title') }}</h1>

    <!-- 分类筛选 Tab -->
    <div class="category-tabs">
      <button
        class="tab"
        :class="{ active: !activeCategory }"
        @click="clearFilter"
      >
        {{ $t('blog.all') }}
      </button>
      <button
        v-for="cat in categories"
        :key="cat"
        class="tab"
        :class="{ active: activeCategory === cat }"
        @click="setCategory(cat)"
      >
        {{ $t(`blog.categories.${cat}`) || cat }}
      </button>
    </div>

    <!-- 文章列表 -->
    <div class="post-list">
      <article
        v-for="post in filteredPosts"
        :key="post.path"
        class="post-card"
      >
        <div class="post-meta">
          <span class="post-category">
            {{ Array.isArray(post.categories) ? post.categories[0] : post.categories }}
          </span>
          <span class="post-date">{{ post.date?.slice(0, 10) }}</span>
        </div>
        <!-- ★ 修复：使用 post.path 而非 post.routePath -->
        <RouterLink :to="post.path || '/'" class="post-title-link">
          <h2 class="post-title">{{ localize(post.title) }}</h2>
        </RouterLink>
        <p v-if="post.description" class="post-desc">
          {{ localize(post.description) }}
        </p>
        <div v-if="post.tags?.length" class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            #{{ tag }}
          </span>
        </div>
      </article>

      <!-- 空状态 -->
      <div v-if="!filteredPosts.length" class="empty-state">
        <p>No posts yet.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

/* ===== 分类 Tabs ===== */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
}

.tab {
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.tab:hover {
  color: var(--text-primary);
  border-color: var(--ctp-surface2);
}
.tab.active {
  color: var(--ctp-base);
  background: var(--accent);
  border-color: var(--accent);
}

/* ===== 文章卡片 ===== */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.25rem;
  transition: all 0.15s ease;
}
.post-card:hover {
  border-color: var(--ctp-surface2);
  transform: translateY(-1px);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
}

.post-category {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.post-date {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.post-title-link {
  text-decoration: none;
  color: inherit;
}

.post-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  transition: color 0.1s ease;
}
.post-title-link:hover .post-title {
  color: var(--accent);
}

.post-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-top: 0.4rem;
  line-height: 1.5;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.6rem;
}

.tag {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

/* ===== 空状态 ===== */
.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-muted);
}
</style>
