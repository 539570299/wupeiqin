---
outline: deep
---

# 实现Nuxt3手机和PC双端路由自动跳转

## 前言
在使用 Nuxt3 开发页面时，因业务的需要，有时因为两端的设计页面显示差异较大，需要使用两套不同的代码开发手机端和PC端，参考了米哈游官网的跳转方式，手机电脑分两套代码进行跳转，PC端用 https://www.mihoyo.com/ ，移动端直接 https://www.mihoyo.com/m 。

PC端：

![PC](https://ossstatic.leiting.com/web/common/docs/images/pc.png)

移动端：

![移动端](https://ossstatic.leiting.com/web/common/docs/images/mobile.png)

## Nuxt3 中如何判断手机端？
在 Vue 项目中我们的页面通常由 Vue Router 来控制路由及导航，Vue Router 提供了导航守卫 的 Hook API，让我们可以来控制路由跳转或取消的方式来守护我们的路由，不让其随意导航至特定页面。 Nuxt 3 提供了一个中间件的目录，让我们可以制作路由的中间件，来实作出类似导航守卫的效果。
路由中间件分为三种：
1. 匿名（或内联）路由中间件，直接在页面当中定义使用。
2. 具名路由中间件，放在middleware/目录下，页面使用时会异步导入自动加载。（注意：路由中间件名称被规范化为 kebab-case，因此someMiddleware变为some-middleware。）
3. 全局路由中间件，放在middleware/目录下（带后缀.global），每次路由变化都会自动运行。
前两种路由中间件可以自定义在页面目录。
路由中间件是接收当前路由和下一个路由作为参数的导航守卫。同时，提供了两个控制路由的方法：
1. navigateTo： 重定向到给定的路由，也可以直接调用它来进行页面导航。
2. abortNavigation：中止导航，带有可选的错误消息。
有了路由中间件后，我们就可以在middleware/目录下建立一个 mobile.global.ts 全局中间件，来判断页面跳转前是否是手机端，是的话跳转到 pages/m 的路由下，否则跳转到 pages/pc。
```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const userAgent = process.server
    ? useRequestHeaders()['user-agent'] ?? ''
    : navigator.userAgent
  to.params.isMobile = String(/mobile/i.test(userAgent))
  const isMobile = () => {
    return String(/mobile/i.test(userAgent))
  }
  // 若为pc端但url中包含/m或者/m，重定向到pc
  if (
    (to.fullPath.includes('/m') || to.fullPath.includes('/m/')) &&
    isMobile() === 'false'
  ) {
    const url = to.fullPath.substring(2)
    return navigateTo(url)
  }
  // 若为移动端但url中不包含/m或者/m，重定向到m
  if (
    (!to.fullPath.includes('/m') || !to.fullPath.includes('/m/')) &&
    isMobile() === 'true'
  ) {
    return navigateTo('m' + to.fullPath)
  }
})
```
这里主要是对 process.server 来判断是否是服务端，如果是服务端则通过 useRequestHeaders()['user-agent'] 进行判断机型，否则则通过客服端的 navigator.userAgent 进行判断。
在 ./pages 中建立pc和m文件夹：

![创建pc&m文件夹](https://ossstatic.leiting.com/web/common/docs/images/pm.png)

## 自定义路由
为了让代码更好的管理，我们是在 ./pages 中建立pc和m文件夹，相对应的路由是pc和m的，如在移动端显示http://localhost:3000/m/，在pc上则要显示 http://localhost:3000/pc/ 才能访问到./pages中pc目录。
那有什么办法能 http://localhost:3000/m/ 访问到手机端，而且pc端直接去掉/pc呢？这个时候就希望用到 Nuxt3 中的自定义路由，使用 nuxt hook 从路由中添加、更改或删除 。
pages:extend hook:
在 nuxt.config.ts 中做如下的配置：
```ts
export default defineNuxtConfig({
  hooks: {
    'pages:extend' (pages: NuxtPage[] = [] ) {
      const pagesToDuplicate = pages.filter(page => page.path.startsWith('/pc'))
      pagesToDuplicate.forEach(page => {
        pages.splice(pages.findIndex(v => v.file == page.file), 1)
        pages.push({
          ...page,
          path: `${page.path.replace('/pc', '')}`,
          name: `${page.name}`
        })
      })
    }
  }
})
```
只要路由表中的 path 有以 '/pc' 开头的直接将其替换成'',  而路由的file访问还是先原先的file路径，从而修改了path自定义了路由表。可以打印出自定义前的路由表和自定义后的路由表进行对比一下：

自定义前：

![自定义前](https://ossstatic.leiting.com/web/common/docs/images/zdyq.png)

自定义后：

![自定义后](https://ossstatic.leiting.com/web/common/docs/images/zdyh.png)

这样就是实现访问 http://localhost:3000/ 和 访问 http://localhost:3000/m/ 的自动切换跳转。

## 页面目录结构
在pc目录下写pc端的代码，在m目录下写移动端的代码：

![目录结构](https://ossstatic.leiting.com/web/common/docs/images/mulu.png)

## 小结
以上，主要写了如何使用中间件进行拦截判断机型，并通过自定义路由的方式实现了pc端和移动端的路由跳转，解决了在 Nuxt 3 中如何使用两套代码分别开发pc端和移动端的问题。

## 参考资料
1. [I can't find process.server in nuxt.js](https://stackoverflow.com/questions/50542124/i-cant-find-process-server-in-nuxt-js)
2. [Nuxt3 middleware](https://nuxt.com/docs/guide/directory-structure/middleware)
3. [Nuxt3 自定义路由](https://nuxt.com/docs/guide/recipes/custom-routing)