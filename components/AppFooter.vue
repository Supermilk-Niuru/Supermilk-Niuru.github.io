<script setup lang="ts">
/**
 * 页脚组件
 * 版权信息 + GitHub 跳转
 */
import { useSiteConfig } from 'valaxy'

const siteConfig = useSiteConfig()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <span class="footer-copyright">
        {{ $t('footer.copyright', { year }) }}
      </span>
      <a
        class="footer-github"
        href="https://github.com/supermilk-niuru"
        target="_blank"
        rel="noopener"
        :title="$t('footer.viewOnGitHub')"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: auto;
  border-top: 1px solid var(--border-light);
  padding: 1.5rem;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  max-width: 900px;
  margin: 0 auto;
}

.footer-copyright {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer-github {
  display: flex;
  align-items: center;
  color: var(--text-muted);
  transition: color 0.15s ease;
}
.footer-github:hover {
  color: var(--text-primary);
}
</style>
