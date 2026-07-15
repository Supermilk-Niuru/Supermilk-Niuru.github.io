<script setup lang="ts">
/**
 * 首页布局（home）
 * 覆盖 yun 主题的 layouts/home.vue
 * 包含导航栏和页脚，确保首页顶部有导航
 */
</script>

<template>
  <div class="layout-home">
    <AppNav />
    <main class="home-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout-home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.home-content {
  flex: 1;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
}
</style>
