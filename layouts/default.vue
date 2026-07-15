<script setup lang="ts">
/**
 * 默认布局
 * 所有页面共享的布局：导航栏 + 内容区 + 页脚
 * 导航栏始终显示英文，不受语言切换影响
 */
</script>

<template>
  <div class="layout-default">
  
    <AppNav />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>
