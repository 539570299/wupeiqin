---
outline: deep
---

# Nuxt3插件和css预处理器的设置
## plugins
Nuxt 会自动加载这个目录，作为插件使用，在这个目录的名称可以使用后缀 .server 或 .client，例如， plugin.server.ts 或 plugin.client.ts 来决定只让服务端或客户端加载这个插件。不设置.server 或 .client的默认是都加载。
## 引入第三方插件（以vue-awesome-swiper为例）
安装Swiper
```md
npm install swiper vue-awesome-swiper
```
在plugin目录下创建一个插件 swiper.ts:
```ts
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// 文档
// https://github.surmon.me/vue-awesome-swiper
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAwesomeSwiper)
})
```
使用组件测试一下：
```vue
<div class="swiper-wraper">
    <swiper
    class="swiper swiper-home"
    :modules="modules"
    :slides-per-view="1"
    :mousewheel="true"
    :loop="true"
    :auto-height="true"
    :pagination="{
        clickable: true
    }"
    :autoplay="{
        delay: 5000,
        disableOnInteraction: false
    }"
    :navigation="true"
    >
        <swiper-slide
            v-for="item in bannerList"
            :key="item.img1920"
            class="slide slide-page slide1"
        >
            <div class="swiper-zoom-container">
            <div class="move">
                <i class="logo ani">
                <img :src="item.icon" />
                </i>
                <h3 class="ani">{{ item.title }}</h3>
                <p class="ani">{{ item.txt }}</p>
                <div class="ani">
                <a :href="item.href" target="_blank" class="btn">{{
                    item.btnTxt
                }}</a>
                </div>
            </div>
            <img :src="item.img1920" class="img" data-type="pc" alt="" />
            </div>
        </swiper-slide>
    </swiper>
</div>
<script setup lang="ts">
import { Pagination, Navigation, Autoplay} from 'swiper'
const modules = [Pagination, Navigation, Autoplay]
</script>

// bannerList 轮播图数据
```
### 手写插件
```vue
//plugins/hello.ts
export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (msg: string) => `Hello ${msg}!`
    }
  }
})
//pages/hello.vue
<template>
  <div>
    {{ $hello('world') }}
  </div>
</template>

<script setup lang="ts">
// alternatively, you can also use it here
const { $hello } = useNuxtApp()
</script>
```

## 设置 css 预处理器
### Sass
先安装 sass 依赖
```md
npm install -D sass
```
在 assets/styles 下 创建 variable.scss 文件，并在 nuxt.config.ts 中做如下配置：
```ts
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/styles/variable.scss";',
        }
      }
    }
  }
})
```
在 variable.scss 中编写变量：
```md
$bgColor: orange;
```
在 vue 全局组件就可以使用这个变量了
```vue
<template>
  <div class="m-wrapper">
    <div>
      <h1 class="title">这是移动端页面</h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title {
  background: $bgColor;
}
</style>
```
![这是移动端页面](https://ossstatic.leiting.com/web/common/docs/images/ism.png)