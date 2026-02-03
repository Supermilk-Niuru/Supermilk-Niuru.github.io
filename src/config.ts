export const SITE = {
  website: "https://supermilk-niuru-github-io.vercel.app/", // replace this with your deployed domain
  author: "Supermilk-Niuru",
  profile: "https://satnaing.dev/",
  desc: ".",
  title: "Niuru's Blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, 
  showArchives: true,
  showBackButton: true, 
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", 
  lang: "en", 
  timezone: "Asia/Shanghai", 
} as const;
