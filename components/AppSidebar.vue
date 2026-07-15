<script setup lang="ts">
/**
 * 博客侧边栏组件
 * 包含搜索框和标签云
 */
defineOptions({ name: 'AppSidebar' })

defineProps<{
  searchQuery: string
  tags: { tag: string; count: number }[]
  activeTag: string
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:activeTag', value: string): void
}>()
</script>

<template>
  <aside class="app-sidebar">
    <!-- ===== 搜索框 ===== -->
    <div class="sidebar-section">
      <h3 class="sidebar-title">{{ $t('sidebar.search') }}</h3>
      <div class="search-box">
        <input
          type="text"
          class="search-input"
          :placeholder="$t('sidebar.searchPlaceholder')"
          :value="searchQuery"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        />
        <svg
          v-if="searchQuery"
          class="search-clear"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          @click="emit('update:searchQuery', '')"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </div>

    <!-- ===== 标签云 ===== -->
    <div class="sidebar-section">
      <h3 class="sidebar-title">{{ $t('sidebar.tags') }}</h3>
      <div class="tags-cloud">
        <button
          v-for="{ tag, count } in tags"
          :key="tag"
          class="tag-btn"
          :class="{ active: activeTag === tag }"
          @click="emit('update:activeTag', activeTag === tag ? '' : tag)"
        >
          #{{ $t('tag.' + tag) || tag }}
          <span class="tag-count">{{ count }}</span>
        </button>
        <p v-if="!tags.length" class="no-tags">{{ $t('sidebar.noTags') }}</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 280px;
  flex-shrink: 0;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

/* ===== 搜索框 ===== */
.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.55rem 0.85rem;
  font-size: 0.85rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-primary);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}

.search-input:focus {
  border-color: var(--accent);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-clear {
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--text-muted);
  opacity: 0.6;
  transition: opacity 0.12s;
}

.search-clear:hover {
  opacity: 1;
}

/* ===== 标签云 ===== */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.65rem;
  font-size: 0.78rem;
  font-family: 'JetBrains Mono', monospace;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.12s ease;
  line-height: 1.4;
}

.tag-btn:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}

.tag-btn.active {
  color: var(--ctp-base);
  background: var(--accent);
  border-color: var(--accent);
}

.tag-count {
  font-size: 0.7rem;
  opacity: 0.6;
}

.tag-btn.active .tag-count {
  opacity: 0.8;
}

.no-tags {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .app-sidebar {
    width: 100%;
  }
}
</style>
