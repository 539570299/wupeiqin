export default [
    { text: '首页', link: '/' },
    { 
        text: '学习分享',
        items: [
            {text: 'Vue3分享', link: '/docs/学习分享/Vue3学习分享/语法糖（setup）'},
            {text: 'Nuxt3分享', link: '/docs/学习分享/Nuxt3学习分享/使用nuxi建立第一个项目'},
            {text: '常见问题汇总', link: '/docs/学习分享/常见问题汇总/移动端H5输入框兼容问题解决'},
            {text: '公共方法汇总', link: '/docs/学习分享/公共方法汇总/comRem计算'},
        ],
        activeMatch: '/docs/学习分享/'
    },
    {text: 'Gitee', link: 'https://gitee.com/wupq', target: '_target'}
    // { text: '百度', link: 'https://www.baidu.com', target: '_self' }
]