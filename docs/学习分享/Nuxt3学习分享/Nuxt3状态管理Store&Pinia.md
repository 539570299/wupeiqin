---
outline: deep
---

# Nuxt3状态管理Store&Pinia
## Pinia
### 安装
目前照着 Pinia 官方安装 Pinia，会发生一些问题，根据报错提示，所以我们在安装时加上 --force 参数。
```md
npm install -D pinia @pinia/nuxt --force
```
添加 @pinia/nuxt 至 nuxt.config.ts 的 modules 属性中。
```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt']
})
```
### 建立 Pinia 的 Store：
在 ./ssr 下建立 stores 目录，创建文件 home.ts：
```ts
import { defineStore } from 'pinia'

const useHomeStore = defineStore('home', {
  state: () => ({
    contactUs: {},
    bannerList: []
  }),
  actions: {
    async getUserProfile() {
      const { homeApi } = useApi()
      const res = await homeApi.getBasicInfo({ lang: 'en' })
      // console.log(res)
      this.bannerList = res.config.bannerList
      this.contactUs = res.config.contactUs
    }
  },
  getters: {}
})

export default useHomeStore
```
创建store/index.ts统一管理所有的 store 并作为出口：
```ts
import useHomeStore from './home'

const useStore = () => {
  return {
    homeStore: useHomeStore()
  }
}

export default useStore
```
在组件中使用：在/pc/index.vue中发送请求:
```vue
<script lang="ts" setup>
import useStore from '@/stores'

const { homeStore } = useStore()
const bannerList = ref([])
// 请求数据
homeStore.getUserProfile()
bannerList.value = homeStore.bannerList
</script>
```
这样就可以在页面中拿到共享数据，其他页面也可以采用一样的方法获取。
以上，便是在 Pinia 的安装和请求数据共享的简单使用。
## 参考资料
[Pinia](https://pinia.vuejs.org/)