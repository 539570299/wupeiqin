---
outline: deep
---

# Nuxt3 网络请求数据和环境变量配置
## Nuxt 网络请求
Nuxt 提供了 $fetch 及四种组合式函数 (Composables)，来进行资料获取，也就是说，我们不需要在额外安装任何 HTTP Client ，如 axios来发送 HTTP 请求，因为 Nuxt 本身就自带了打 API 的方法，而且在页面、组件中就可以直接使用。
### useFetch
接下来，我们将主要来介绍useFetch 的使用，以及用 useFetch 封装一个api接口http请求。
useFetch() 传入的参数
- url: 要获取api的 URL。
- options: 
  - method: 发送 HTTP 请求的方法，例如 GET、POST 或 DELETE 等。
  - params: 查询参数 (Query params)。
  - body: 请求的 body，可以传入一个物件，它将自动被转化为字串。
  - headers: 请求的标头 (headers)。
  - baseURL: 请求的 API 路径，基于的 URL。。
useFetch() 的回传值
- data: 传入异步函数的回调结果。
- pending: 以 true 或 false 表示是否正在获取数据。
- refresh / execute: 一个函数，可以用来重新执行 handler 函数，回调新的数据。预设情况下 refresh() 执行完并回调后才能再次执行。
- error: 数据获取失败时的回调。

### 封装 http 请求
在 src 的 utils 目录下新建一个 http.ts
```ts
import { hash } from 'ohash'

// 后端返回的数据类型
export interface ResOptions<T> {
  data: T
  status?: number
  message?: string
}

class Http {
  /**
   * api请求封装
   * @param { String } url 请求地址
   * @param { Object } options useFtech第二个参数
   */
  async fetch(url: string, options?: object) {
    try {
      // Nuxt3.0正式版环境变量要从useRuntimeConfig里的public拿
      const {
        public: { VITE_APP_API_URL }
      } = useRuntimeConfig()
      const reqUrl = VITE_APP_API_URL + url // 你的接口地址
      // 设置key
      const key = hash(options + url)

      const { data } = await useFetch(reqUrl, {
        ...options,
        key
      })
      const result = JSON.parse(data.value as string) as ResOptions<any>
      const { status, message } = result
      if (status !== 1) {
        // 这里处理错你自定义的错误，例如 status !== 1
        throw createError({
          statusCode: 500,
          statusMessage: reqUrl,
          message: message || '服务器内部错误'
        })
      } else {
        return result.data // 这里直接返回data
      }
    } catch (err) {
      console.log(err)
      return Promise.reject(err)
    }
  }

  get(url: string, params?: any) {
    return this.fetch(url, { method: 'get', params })
  }

  post(url: string, body?: any) {
    return this.fetch(url, { method: 'post', body })
  }

  put(url: string, body?: any) {
    return this.fetch(url, { method: 'put', body })
  }

  delete(url: string, body?: any) {
    return fetch(url, { method: 'delete', body })
  }
}

export default Http 
```
在 src新建一个 api目录，新建一个 index.ts 和 home.ts， index.ts 用于入口文件，导出其他模块，home.ts 为对应的页面模块 api 接口文件。

![api](https://ossstatic.leiting.com/web/common/docs/images/api.png)

index.ts 中：
```ts
import homeApi from './home'

export default {
  homeApi
}
```
home.ts中
```ts
import Http from '@/utils/http'

class HomeApi extends Http {
  /**
   * 获取基础数据
   * @param { String } lang 语言
   */
  getBasicInfo(params: any) {
    return this.get('/home/getBasicInfo', params)
  }
}

export default new HomeApi()
```
### 创建 Api hook
Nuxt 为我们建立了 composables 目录用来建立 hook 文件，并且自动加载。我们可以通过 composables 建立一个 useApi() hook，要请求接口的时候直接调用这个hook即可。
在 composables 目录中建立 index.ts：
```ts
import api from '@/api/index'

export const useApi = () => api
```
在组件中使用 useApi() hook
```ts
const { homeApi } = useApi()
const res = await homeApi.getBasicInfo({ lang: 'en' })
cosnole.log(res) // 请求后的数据
```

## 环境变量设置
在我们开发网站或部署时，我们总是有一些环境变量需要做设置。如在开发环境的时候访问本地api，在测试环境访问测试api，而在部署正式环境的时候访问正式的api。这时，就需要对环境变量做一些设置。
### vite中多环境配置
在 Nuxt 中内置了 vite， 我们可以通过 vite 配置 package.json 配置 mode， Vite 会在import.meta.env 对象上暴露环境变量，Vite内置了dotenv这个第三方库， dotenv会自动读取.env文件。首先，我们先配置下package.json：
```md
"scripts": {
    "dev": "nuxt dev", // 默认读取 .env.dev文件中的配置
    "build:test": "nuxt build --mode test", // 读取 .env.test文件中的配置
    "build:prod": "nuxt build --mode prod", // 读取 .env.prod文件中的配置
    ....
  },
```
在根目录下就可以创建 .env.dev、.env.test和.env.prod的文件，并写入同个变量不能的值进行区分
我们在项目的根目录下，创建 .env文件，写入测试内容；
```md
# 默认本地环境
VITE_ENV='dev'
VITE_APP_API_URL = 'http://ltgamesglobalapitest.leiting.com'
```
创建 .env.test文件，写入测试内容；
```md
# 测试环境
VITE_ENV='dev'
VITE_APP_API_URL = 'http://testleitingapios.leiting.com'
```
创建 .env.prod 文件，写入测试内容；
```md
# 正式环境
VITE_ENV='dev'
VITE_APP_API_URL = 'https://wwwapi.ltgamesglobal.net'
```
### nuxt多环境配置
Nuxt 3 提供了可以设定 Runtime Config 的方式，我们可以通过这个来配置环境变量，先通过import.meta.env会自动获取process.env中VITE_开头的信息。
在 nuxt.config.ts 中：
```md
const eneString = process.env.npm_lifecycle_script || ''
const envScript = eneString.split(' ')
const envName = envScript[envScript.length - 1] 
// 获取.env文件中的配置
const envData = loadEnv(envName, process.cwd()) as unknown as VITE_ENV_CONFIG 
```
接着可以在 nuxt.config.ts 中添加 runtimeConfig 属性，就可以来设置环境变量。
```ts
export default defineNuxtConfig({
  // 将环境变量设置到 runtimeConfig 当中
  runtimeConfig: {
    public: envData //将 envData 配置到 runtimeConfig 中
  },
})
```
这样在全局当中，我们就可以使用 useRuntimeConfig() 这个hook 拿到 runtimeConfig 里面的信息，在封装 api 请求的时候通过这个配置接口地址：
```ts
// http.ts
// Nuxt3.0正式版环境变量要从useRuntimeConfig里的public拿
  const {
    public: { VITE_APP_API_URL }
  } = useRuntimeConfig()
  const reqUrl = VITE_APP_API_URL + url // 你的接口地址
```
这样就可以区分环境进行开发和部署了。

## 参考资料
- [Nuxt 3 - Data Fetching](https://nuxt.com.cn/)
- [Nuxt 3 - Runtime Config](https://nuxt.com.cn/)
- [Nuxt 3 - App Config File](https://nuxt.com.cn/)