<script setup lang="ts">
/**
 * CV / Resume 页面
 * 展示个人简历信息
 * 以后可以扩展为真正的 PDF 生成或嵌入
 */
import { useSiteConfig } from 'valaxy'

const siteConfig = useSiteConfig()

const education = [
  {
    period: '2025 - Present',
    institution: 'Your University',
    degree: 'Bachelor of Computer Science',
    description: 'Focus on Artificial Intelligence and Brain-Computer Interface',
  },
]

const skills = [
  { category: 'Programming', items: ['Python', 'C / C++', 'TypeScript', 'Java'] },
  { category: 'AI / ML', items: ['PyTorch', 'Scikit-learn', 'Deep Learning', 'EEG Processing'] },
  { category: 'Tools', items: ['Git', 'Linux', 'Docker', 'VS Code', 'Vim'] },
  { category: 'Languages', items: ['Chinese (Native)', 'English (Professional)'] },
]
</script>

<template>
  <div class="cv-page">
    <h1 class="page-title">Curriculum Vitae</h1>
    <p class="page-intro">
      <a :href="siteConfig.value.social?.find((l: any) => l.name === 'GitHub')?.url || '#'" target="_blank" rel="noopener" class="cv-link">GitHub</a>
      <span class="sep">·</span>
      <a :href="'mailto:' + (siteConfig.value.social?.find((l: any) => l.name === 'Email')?.url || '').replace('mailto:', '')" class="cv-link">Email</a>
    </p>

    <!-- Education -->
    <section class="section">
      <h2 class="section-title">Education</h2>
      <div v-for="edu in education" :key="edu.period" class="cv-item">
        <div class="cv-period">{{ edu.period }}</div>
        <h3 class="cv-heading">{{ edu.degree }}</h3>
        <p class="cv-sub">{{ edu.institution }}</p>
        <p v-if="edu.description" class="cv-desc">{{ edu.description }}</p>
      </div>
    </section>

    <!-- Skills -->
    <section class="section">
      <h2 class="section-title">Skills</h2>
      <div v-for="group in skills" :key="group.category" class="skill-group">
        <h3 class="skill-category">{{ group.category }}</h3>
        <div class="skill-items">
          <span v-for="item in group.items" :key="item" class="skill-tag">{{ item }}</span>
        </div>
      </div>
    </section>

    <!-- Download -->
    <section class="section">
      <p class="download-note">
        PDF version coming soon.
      </p>
    </section>
  </div>
</template>

<style scoped>
.cv-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.page-intro {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.sep {
  margin: 0 0.5rem;
  color: var(--text-muted);
}

.cv-link {
  color: var(--accent);
  text-decoration: none;
}
.cv-link:hover {
  text-decoration: underline;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.4rem;
}

.cv-item {
  margin-bottom: 1.25rem;
}

.cv-period {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 500;
  font-family: 'JetBrains Mono', monospace;
}

.cv-heading {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.2rem 0 0.1rem;
}

.cv-sub {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.cv-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.skill-group {
  margin-bottom: 1rem;
}

.skill-category {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.35rem;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skill-tag {
  font-size: 0.82rem;
  padding: 0.2rem 0.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
}

.download-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: italic;
}
</style>
