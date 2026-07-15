<script setup lang="ts">
/**
 * 首页
 * 顺序：Hero → Education → Recent Posts → Projects → Academic → GitHub
 */
 
import { useSiteConfig, useSiteStore } from 'valaxy'
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
const siteConfig = useSiteConfig()
const siteStore = useSiteStore()

function localize(val: string | Record<string, string> | undefined): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  const lang = localStorage.getItem('valaxy-lang') || 'zh-CN'
  return val[lang] || val['zh-CN'] || ''
}

const posts = (siteStore.postList || []) as any[]
const socialLinks = siteConfig.value.social || []

// 最新3篇文章
const latestPosts = [...posts]
  .sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
  .slice(0, 3)

// Projects 分类文章
const projectPosts = posts.filter((p: any) => {
  const cats = p.categories
  if (!cats) return false
  if (Array.isArray(cats)) return cats.includes('Projects')
  return cats === 'Projects'
}).slice(0, 2)

// Research 文章
const researchPosts = posts.filter((p: any) => {
  const cats = p.categories
  if (!cats) return false
  if (Array.isArray(cats)) return cats.includes('Research')
  return cats === 'Research'
}).slice(0, 3)
</script>

<template>
  <div class="home-page">
  <div class="home">
  
    <!-- ========== 1. Hero ========== -->
    <section class="hero">
      <div class="hero-avatar">
         <img
      src="/avatar.png"
      alt="Supermilk-Niuru"
      class="avatar-img"
  >
      </div>
      <h1 class="hero-name">Supermilk-Niuru</h1>
      <p class="hero-title">A Student Major In Computer Science</p>

      <div class="hero-social">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          :title="link.name"
          target="_blank"
          rel="noopener"
          class="social-btn"
        >
          <span :class="link.icon" />
          <span class="social-label">{{ link.name }}</span>
        </a>
      </div>
    </section>

    <!-- ========== 2. Education ========== -->
<section class="sec">
  <h2 class="sec-title">Education</h2>
  <div class="edu-card">
    <div class="edu-icon">🎓</div>
    <div class="edu-body">
      <div class="edu-period">2025 – Present</div>
      <h3 class="edu-major">Bachelor of Computer Science</h3>
      <a
        class="edu-school"
        href="https://www.ccnu.edu.cn/"
        target="_blank"
        rel="noopener"
      >
        华中师范大学
      </a>
    </div>
  </div>
</section>

    <!-- ========== 3. Recent Posts ========== -->
    <section class="sec">
      <h2 class="sec-title">Recent Posts</h2>
      <div class="items">
        <article v-for="post in latestPosts" :key="post.path" class="item-row">
          <RouterLink :to="post.path || '/'" class="item-link">
            <span class="item-title">{{ localize(post.title) }}</span>
            <span class="item-date">{{ post.date?.slice(0, 10) }}</span>
          </RouterLink>
        </article>
      </div>
      <RouterLink to="/blog" class="sec-more">View all posts →</RouterLink>
    </section>

   

    <!-- ========== 6. GitHub ========== -->
    <section class="sec">
      <h2 class="sec-title">GitHub Contributions</h2>
      <div class="gh-box">
        <img
          src="https://ghchart.rshah.org/supermilk-niuru"
          alt="Contributions"
          class="gh-img"
          onerror="this.style.display='none'"
        />
      </div>
    </section>
 </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.home { max-width: 1000px; margin: 0 auto; }

/* ===== Hero ===== */
.hero { text-align: center; padding: 3rem 0 2.5rem; }
.hero-avatar {
  width: 96px; height: 96px; margin: 0 auto 1rem;
  border-radius: 50%; overflow: hidden;
   border: 2px solid var(--border-color);
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.avatar-letter { font-size: 2.5rem; font-weight: 700; color: var(--bg-primary); }
.hero-name { font-size: 1.5rem; font-weight: 700; }
.hero-title { color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.25rem; }

.hero-interests { margin-top: 0.75rem; text-align: left; display: inline-block; }
.interests-label { font-weight: 600; font-size: 0.88rem; color: var(--text-secondary); }
.interests-list { list-style: disc; padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.88rem; color: var(--text-muted); }
.interests-list li { margin-bottom: 0.1rem; }

.hero-social { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin-top: 1rem; }
.social-btn {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.35rem 0.65rem; font-size: 0.82rem; font-weight: 500;
  color: var(--text-secondary); background: var(--bg-card);
  border: 1px solid var(--border-color); border-radius: 8px;
  text-decoration: none; transition: all 0.12s;
}
.social-btn:hover { color: var(--accent); border-color: var(--accent); }
.social-label { font-size: 0.8rem; }

/* ===== Section ===== */
.sec { margin: 2.5rem 0; }
.sec-title {
  font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);
  text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.75rem;
}
.sec-more { font-size: 0.85rem; color: var(--accent); font-weight: 500; margin-top: 0.5rem; display: inline-block; }
.sub-title { font-size: 0.88rem; font-weight: 600; color: var(--text-secondary); margin: 1rem 0 0.5rem; }
.muted { font-size: 0.85rem; color: var(--text-muted); font-style: italic; }

/* ===== Education ===== */
.edu-card { display: flex; gap: 0.75rem; padding: 1rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; }
.edu-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 0.1rem; }
.edu-period { font-size: 0.8rem; color: var(--accent); font-weight: 500; font-family: 'JetBrains Mono', monospace; }
.edu-major { font-size: 1rem; font-weight: 600; margin: 0.15rem 0 0.05rem; }
.edu-school { font-size: 0.88rem; color: var(--text-secondary); }

/* ===== Items ===== */
.items { display: flex; flex-direction: column; }
.item-row { border-bottom: 1px solid var(--border-light); }
.item-row:last-child { border-bottom: none; }
.item-link {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.55rem 0; color: var(--text-primary); text-decoration: none; transition: color 0.1s;
}
.item-link:hover { color: var(--accent); }
.item-title { font-size: 0.92rem; font-weight: 500; }
.item-date { font-size: 0.78rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; white-space: nowrap; margin-left: 1rem; }
.paper-link { gap: 0.4rem; justify-content: flex-start; }
.paper-emoji { flex-shrink: 0; }

/* ===== Projects ===== */
.proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.proj-card {
  display: block; padding: 1rem; background: var(--bg-card);
  border: 1px solid var(--border-color); border-radius: 10px;
  text-decoration: none; color: inherit; transition: all 0.12s;
}
.proj-card:hover { border-color: var(--accent); transform: translateY(-1px); }
.proj-name { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.25rem; }
.proj-desc { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.5rem; }
.proj-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.tag { font-size: 0.72rem; font-weight: 500; color: var(--ctp-mauve); background: rgba(203,166,247,0.1); padding: 0.1rem 0.4rem; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
.proj-more { display: flex; align-items: center; justify-content: center; border-style: dashed; opacity: 0.35; }
.proj-more-text { font-size: 0.85rem; color: var(--text-muted); text-align: center; }

/* ===== Interests ===== */
.tag-cloud { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.interest-tag { font-size: 0.82rem; color: var(--accent); background: rgba(137,180,250,0.06); border: 1px solid rgba(137,180,250,0.15); padding: 0.2rem 0.6rem; border-radius: 6px; }

/* ===== Skills ===== */
.skill-list { display: flex; flex-direction: column; gap: 0.6rem; }
.skill-row { display: flex; align-items: center; gap: 0.75rem; }
.skill-name { font-size: 0.85rem; font-weight: 500; width: 120px; flex-shrink: 0; }
.skill-bar { flex: 1; height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden; }
.skill-fill { height: 100%; background: linear-gradient(90deg, var(--ctp-blue), var(--ctp-lavender)); border-radius: 3px; }

/* ===== GitHub ===== */
.gh-box { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 1rem; overflow-x: auto; }
.gh-img { width: 100%; min-width: 600px; }

/* ===== RWD ===== */
@media (max-width: 640px) {
  .hero { padding: 2rem 0 1.5rem; }
  .proj-grid { grid-template-columns: 1fr; }
  .skill-row { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
  .skill-name { width: auto; }
}
</style>
