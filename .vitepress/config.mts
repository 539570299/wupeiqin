import { defineConfig } from 'vitepress'
import nav from './nav.mjs'
import sidebar from './sidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'wupq的博客',
    description: '关注前端开发',
    base: '/web/common/docs/', // 网站部署到github的vitepress这个仓库里
    // srcDir: 'docs',
    lastUpdated: true, // 禁用上次更新时间
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: nav,
        sidebar: sidebar,
        aside: true, // 是否显示页面大纲（右侧导航）
        outline: {
            label: '目录'
        },
        logo: '/wupq.jpg',
        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'},
            // {icon: 'twitter', link: 'https://www.baidu.com'}
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present Evan You'
        },
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
              dateStyle: 'short',
              timeStyle: 'short'
            }
        },
        search: {
            provider: 'local'
        }
    }
})
