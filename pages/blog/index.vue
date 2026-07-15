<script setup lang="ts">
/**
 * Blog 页面（两栏布局）
 * - 左侧：文章列表（支持分类、搜索、标签筛选）
 * - 右侧：侧边栏（搜索框 + 标签云）
 *
 * 搜索使用 Valaxy 内置的 useLocalSearch（MiniSearch），
 * 可检索文章标题、正文内容和 tags
 */
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useSiteStore, useLocalSearch } from 'valaxy'

const siteStore = useSiteStore()
const route = useRoute()
const router = useRouter()

// ===== 搜索状态 =====
const searchQuery = ref('')
const { results: searchResults, load: loadSearchIndex } = useLocalSearch(searchQuery)
const activeTag = ref('')

onMounted(() => {
  loadSearchIndex()
})

/**
 * 解析国际化字段（标题、描述等）
 */
function localize(val: string | Record<string, string> | undefined): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  const lang = (route.query.lang as string) || localStorage.getItem('valaxy-lang') || 'zh-CN'
  return val[lang] || val['zh-CN'] || ''
}

// 所有文章
const allPosts = computed(() => {
  const list = siteStore.postList || ([] as any[])
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

// 所有标签（含文章数）
const allTags = computed(() => {
  const tagMap = new Map<string, number>()
  allPosts.value.forEach((p: any) => {
    if (p.tags) {
      const tags = Array.isArray(p.tags) ? p.tags : [p.tags]
      tags.forEach((t: string) => {
        tagMap.set(t, (tagMap.get(t) || 0) + 1)
      })
    }
  })
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
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

// ===== 筛选逻辑 =====
// 先按搜索关键词筛选
// 搜索索引中的 id 包含 .html 后缀和 #anchor，需要归一化后与 post.path 匹配
const searchFiltered = computed(() => {
  if (!searchQuery.value) return allPosts.value

  const normalizedPaths = new Set(
    searchResults.value.map((r) => {
      // 去掉 #anchor 后缀
      const withoutAnchor = r.id.split('#')[0]
      // 去掉 .html 后缀
      return withoutAnchor.replace(/\.html$/, '')
    })
  )
  return allPosts.value.filter((p: any) => normalizedPaths.has(p.path))
})

// 再按分类 + 标签筛选
const filteredPosts = computed(() => {
  let posts = searchQuery.value ? searchFiltered.value : allPosts.value

  if (activeCategory.value) {
    posts = posts.filter((p: any) => {
      const cats = p.categories
      if (!cats) return false
      if (Array.isArray(cats)) return cats.includes(activeCategory.value)
      return cats === activeCategory.value
    })
  }

  if (activeTag.value) {
    posts = posts.filter((p: any) => {
      if (!p.tags) return false
      const tags = Array.isArray(p.tags) ? p.tags : [p.tags]
      return tags.includes(activeTag.value)
    })
  }

  return posts
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
  <div class="blog-layout">
    <!-- ===== 左侧主内容 ===== -->
    <div class="blog-main">
      <h1 class="page-title">{{ $t('blog.title') }}</h1>

      <!-- 搜索结果提示 -->
      <p v-if="searchQuery" class="search-hint">
        {{ $t('blog.searchResults', { query: searchQuery }) }}
        (<a href="javascript:void(0)" @click="searchQuery = ''">{{ $t('blog.clearSearch') }}</a>)
      </p>

      <!-- 标签筛选提示 -->
      <p v-if="activeTag" class="tag-hint">
        {{ $t('blog.filteredByTag') }} <strong>#{{ activeTag }}</strong>
        (<a href="javascript:void(0)" @click="activeTag = ''">{{ $t('blog.clearFilter') }}</a>)
      </p>

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
          <RouterLink :to="post.path || '/'" class="post-title-link">
            <h2 class="post-title">{{ localize(post.title) }}</h2>
          </RouterLink>
          <p v-if="post.description" class="post-desc">
            {{ localize(post.description) }}
          </p>
          <div v-if="post.tags?.length" class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">
              #{{ $t('tag.' + tag) || tag }}
            </span>
          </div>
        </article>

        <!-- 空状态 -->
        <div v-if="!filteredPosts.length" class="empty-state">
          <p>{{ $t('blog.noPosts') }}</p>
        </div>
      </div>
    </div>

    <!-- ===== 右侧侧边栏 ===== -->
    <AppSidebar
      :search-query="searchQuery"
      :tags="allTags"
      :active-tag="activeTag"
      @update:search-query="searchQuery = $event"
      @update:active-tag="activeTag = $event"
    />
  </div>
</template>

<style scoped>
.blog-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2.5rem;
  align-items: start;
}

.blog-main {
  min-width: 0;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

/* ===== 筛选提示 ===== */
.search-hint,
.tag-hint {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.search-hint a,
.tag-hint a {
  color: var(--accent);
  text-decoration: none;
  cursor: pointer;
}

.search-hint a:hover,
.tag-hint a:hover {
  text-decoration: underline;
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

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .blog-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
