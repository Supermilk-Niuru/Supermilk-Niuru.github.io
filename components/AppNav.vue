<script setup lang="ts">
/**
 * 导航栏组件
 * 导航文字始终显示英文，不受语言切换影响
 * Blog 有下拉菜单：Research / Computer Science / Life / Thoughts
 */
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const router = useRouter()
const route = useRoute()
const dropdownOpen = ref(false)

// 语言切换
const currentLang = computed(() => {
  // 从 URL 参数或 localStorage 获取
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('valaxy-lang') || 'zh-CN'
  }
  return 'zh-CN'
})

const isEnglish = computed(() => currentLang.value === 'en')

function toggleLang() {
  const newLang = isEnglish.value ? 'zh-CN' : 'en'
  localStorage.setItem('valaxy-lang', newLang)
  window.location.reload()
}

// 关闭下拉
function closeDropdown(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.nav-dropdown')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

// Blog 分类跳转
function goToCategory(cat: string) {
  dropdownOpen.value = false
  router.push({ path: '/blog', query: { category: cat } })
}

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'Blog',
    hasDropdown: true,
    children: [
      { label: 'Research', category: 'Research' },
      { label: 'Computer Science', category: 'Computer Science' },
      { label: 'Life', category: 'Life' },
      { label: 'Thoughts', category: 'Thoughts' },
    ],
  },
  { label: 'Projects', path: '/projects' },
  { label: 'Academic', path: '/academic' },
  { label: 'About', path: '/about' },
  { label: 'CV', path: '/cv' },
]
</script>

<template>
  <nav class="nav-bar">
    
    <div class="nav-inner">
      <!-- 站点名称 -->
      <RouterLink to="/" class="nav-brand">
        Supermilk-Niuru
      </RouterLink>

      <!-- 导航链接 -->
      <div class="nav-links">
        <div
          v-for="item in navItems"
          :key="item.label"
          class="nav-item"
          :class="{ 'has-dropdown': item.hasDropdown }"
        >
          <!-- 有下拉菜单的项（Blog） -->
          <template v-if="item.hasDropdown">
            <button
              class="nav-link dropdown-trigger"
              @click="router.push('/blog')"
              @mouseenter="dropdownOpen = true"
            >
              {{ item.label }}
              <span class="dropdown-arrow">▾</span>
            </button>
            <div
              v-if="item.children"
              class="nav-dropdown"
              :class="{ open: dropdownOpen }"
              @mouseenter="dropdownOpen = true"
              @mouseleave="dropdownOpen = false"
            >
              <button
                v-for="child in item.children"
                :key="child.label"
                class="dropdown-item"
                @click="goToCategory(child.category)"
              >
                {{ child.label }}
              </button>
            </div>
          </template>

          <!-- 普通链接 -->
          <RouterLink
            v-else
            :to="item.path!"
            class="nav-link"
            :class="{ active: item.path === '/' ? route.path === '/' : route.path.startsWith(item.path!) }"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>

      <!-- 右侧按钮 -->
      <div class="nav-actions">
        <!-- 语言切换 -->
        <button class="nav-action-btn" :title="$t('theme.switchLang')" @click="toggleLang">
          {{ isEnglish ? '中' : 'EN' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid var(--border-light);
}

.dark .nav-bar,
:root[data-theme='dark'] .nav-bar {
  background: rgba(36, 39, 58, 0.8);
  border-bottom-color: var(--border-color);
}

.nav-inner {
  display: flex;
  align-items: center;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 56px;
  gap: 0.5rem;
}

.nav-brand {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--ctp-text);
  text-decoration: none;
  margin-right: auto;
  letter-spacing: -0.02em;
}
.nav-brand:hover {
  color: var(--ctp-blue);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ctp-subtext0);
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.15s ease;
}
.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.15s ease;
}
.has-dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  background: var(--ctp-surface0);
  border: 1px solid var(--ctp-surface1);
  border-radius: 10px;
  padding: 0.35rem;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px);
  transition: all 0.15s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.nav-dropdown.open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.5rem 0.85rem;
  font-size: 0.88rem;
  color: var(--ctp-subtext0);
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: all 0.1s ease;
}
.dropdown-item:hover {
  color: var(--ctp-text);
  background: var(--ctp-surface1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.5rem;
}

.nav-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ctp-subtext0);
  background: none;
  border: 1px solid var(--ctp-surface1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.nav-action-btn:hover {
  color: var(--ctp-text);
  background: var(--ctp-surface1);
}
</style>
