import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点基础信息
  title: '教程站',
  description: '分享实用教程与经验记录',
  lang: 'zh-CN',
  // GitHub Pages 项目站点地址形如 https://<用户名>.github.io/<仓库名>/
  // 因此 base 需要带上仓库名前缀；若以后绑定独立域名，再改回 '/'
  base: '/-online/',

  // 主题配置
  themeConfig: {
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/guide/' },
      { text: '关于', link: '/about' }
    ],

    // 左侧边栏
    sidebar: [
      {
        text: '入门',
        items: [
          { text: '教程总览', link: '/guide/' },
          { text: '如何写第一篇教程', link: '/guide/getting-started' }
        ]
      },
      {
        text: '资源分享',
        items: [
          { text: '好用的工具合集', link: '/guide/lanzou-tools' }
        ]
      },
      {
        text: 'AI 工具',
        items: [
          { text: 'Codex 部署与中转站配置', link: '/guide/codex-ccswitch' }
        ]
      }
    ],

    // 本地全文搜索（纯静态，无需任何后端服务）
    search: {
      provider: 'local'
    },

    // 页面目录
    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    // 社交链接，指向本站源码仓库
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aokaweimo-pixel/-online' }
    ],

    // 文档底部
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' }
    },

    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '切换语言',

    footer: {
      message: '内容基于 Markdown 编写，源码托管于 Git 仓库',
      copyright: 'Copyright © 2026'
    }
  }
})
