---
outline: deep
---
# Nuxt3页面与路由(Pages and Router)
## 前言
在 Vue 中，建立 pages 目录， Nuxt 会自动导入Vue Router 来管理路由，在pages中建立文件，会自动生成路由配置。接下来我们将通过基础路由、动态路由、嵌套路由和路由跳转进行意义介绍。

## 自定义目录结构
在第一篇建立Nuxt项目中，有简单的介绍了项目的路由结构，接下来对目录结构做一下小的修改，在 nuxt.config.ts 增加 [srcDir](https://nuxt.com/docs/api/nuxt-config#srcdir) 配置。
```md
export default {
  srcDir: 'src/'
}
```

可以将dir目录自定义到src目录下面，方便开发和管理。
```md
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| src/
------| assets/
------| components/
------| composables
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| static/
------| store/
------| server/
```

## 建立第一个页面 -- ./pages/index.vue
在Nuxt3 的pages 目录中，建立 index.vue 文件，表示路由 ·/ 对应的页面。在vue中，当添加路由后，需要在进入的页面添加路由进入口，也就是Vue Router 中的 <router-view />，同样的，在 Nuxt3 中页需要使用<NuxtPage /> 来添加路由，如果没添加这个，路由和页面将无法使用。
在 .pgaes/index.vue  中
```vue
<template>
  <div class="home-wrapper">
    <div>
      <h1>建立第一个页面</h1>
    </div>
  </div>
</template>
```
在 ./app.vue 中，添加<NuxtPage />
```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

这样在浏览器中就可以看到页面。

![one](https://ossstatic.leiting.com/web/common/docs/images/one.png)

## 路由页面 --  ./pages/**

在 ./pages 中分别建立about.vue 、contact.vue，分别写入不同的内容，结构如下所示：

![page](https://ossstatic.leiting.com/web/common/docs/images/page.png)

在浏览器中访问/about 或 /contact 就可以看到相关的内容了。

![about](https://ossstatic.leiting.com/web/common/docs/images/about.png)

## 路由跳转
### NuxtLink
在 Vue Router 我们可以使用 router-link 来建立路由跳转，以此来导航至其他页面，而在 Nuxt3 的路由中，则是使用 NuxtLink 来建立路由连结来进行页面的跳转。
在./pages/index.vue，修改內容如下：
```vue
<template>
  <div class="home-wrapper">
    <div>
      <h1>建立第一个页面 -- 首页</h1>
      <div>
        <NuxtLink to="/about">前往 About</NuxtLink>
        <NuxtLink to="/contact">前往 Contact</NuxtLink>
      </div>
    </div>
  </div>
</template>
```
点击 前往 About 和 前往 Contact 可以分别跳转到对应的页面。

![前往](https://ossstatic.leiting.com/web/common/docs/images/qw.png)

### navigateTo
如果想使用像 Vue Router 提供的 router.push 方法进行带参数跳转的话，在 Nuxt 中，可以使用 navigateTo。
```vue
<script setup>
navigateTo({
  path: '/detail',
  query: {
    id: 1,
    sort: 'abc'
  }
})
</script>
```
具体的参数可以参考官网：[navigateTo](https://nuxt.com/docs/api/utils/navigate-to#navigateto)

## 动态路由
如果我们需要将路径作为参数进行传递，例如，我们有一个 users 页面元件，在 /users/wupq 或 /users/wupq2 路径，都能匹配到同一个 users 页面，并将 wupq 或 wupq2 当作参数传递给 users 页面使用，这个时候就需要用动态路由来做到这件事。
在 vue 中我们是使用路由表进行配置：
```md
{
    name: "users",
    path: "/users/:id",
    component: "./pages/users.vue",
}
```
在Nuxt 中，要实现这样的效果，只需要在 pages 目录下的 users 中建立[id].vue 文件，如下所示：

![[id].vue](https://ossstatic.leiting.com/web/common/docs/images/id.png)

要获取对应的id的话，可以通过 useRoute() 的 route.params 的获得：
```vue
<script setup>
const route = useRoute()
const { id } = route.params
</script>
<template>
  <div class="users-wrapper">
    <div>
      <h1>这是users页面</h1>
      <div>id: {{ id }}</div>
    </div>
  </div>
</template>
```

## 嵌套路由
在 Nuxt 3 页面的约定式路由规定下，我们可以通过目录结构与页面实现嵌套路由的效果。
在 pages/ 中建立 detail 文件夹并建立，detail-1.vue 和 detail-2.vue

![detail.vue](https://ossstatic.leiting.com/web/common/docs/images/detail.png)

./pages/detail.vue
```vue
<template>
  <div class="detail-wrapper">
    <div>
      <h1>这是detail页面</h1>
      <div>
        <NuxtLink to="/detail/detail-1">前往 detail 1</NuxtLink>
        <NuxtLink to="/detail/detail-2">前往 detail 2</NuxtLink>
      </div>
      <div class="page-content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
```
./pages/detail-1.vue
```vue
<template>
  <div class="detail1-wrapper">
    <div>
      <h1>这是detail1页面</h1>
    </div>
  </div>
</template>
```
./pages/detail-2.vue
```vue
<template>
  <div class="detail2-wrapper">
    <div>
      <h1>这是detail2页面</h1>
    </div>
  </div>
</template>
```
在浏览器中可以实现点击 前往 detail 1 和 前往 detail 1 实现页面跳转切换。

![切换](https://ossstatic.leiting.com/web/common/docs/images/qh.png)

## 404 Not Found 页面
Nuxt 3 提供一个配置来处理 404 Not Found 的页面，当我们建立 ./pages/[...slug].vue 页面， Nuxt 3 所有未匹配的路由，都会跳转到[...slug].vue 页面当中。
在 ./pages 中建立[...slug].vue文件
```vue
<template>
  <div class="404-wrapper">
    <div>
      <h1>404页面</h1>
    </div>
  </div>
</template>
```
在浏览器中访问一个不是pages中的文件目录，比如 /not，这个时候页面将跳转到[...slug].vue当中

![404](https://ossstatic.leiting.com/web/common/docs/images/404.png)

## 小结
以上主要介绍了关于 Nuxt3 的页面与路由，主要的重点是，路由的跳转、通过目录的结构与名称及中括号 [] ，实现动态路由和嵌套路由的方式。

## 参考资料
- [Nuxt 3 - Nuxt Pages](https://nuxt.com/docs/guide/directory-structure/pages)
- [Nested Routes | Vue Router](https://router.vuejs.org/guide/essentials/nested-routes.html)