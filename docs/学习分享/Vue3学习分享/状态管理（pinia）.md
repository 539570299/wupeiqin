---
outline: deep
---

# Vue3状态管理（pinia）使用教程
## [Pinia](https://pinia.vuejs.org/) 使用
![Pinia](https://ossstatic.leiting.com/web/common/docs/images/pinia.png)

### Pinia store 有3个主要组成部分
- State

与 Vuex 案例完全相同

-  Actions

Pinia 的 Actions 与 Vuex Mutations 操作相同，并支持异步操作，这是改变 State 的方法。

  直接修改

  $patch同时修改多个值

  actions修改

- Getters

和计算属性一样的用法，与 Vuex 案例完全相同。

### 安装
```
npm install pinia --save
//or
yarn add pinia
```
### Pinia store简单示例
```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(id, {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter ++
    },
    reduce() {
      this.counter --
    },
  }
})
```
defineStore 接收两个参数

第一个参数就是模块的名称，必须是唯一的，多个模块不能重名，Pinia 会把所有的模块都挂载到根容器上

第二个参数是一个对象，里面的选项和 Vuex 差不多

- 其中 state 用来存储全局状态，它必须是箭头函数，为了在服务端渲染的时候避免交叉请求导致的数据状态污染所以只能是函数，而必须用箭头函数则为了更好的 TS 类型推导。
- getters 就是用来封装计算属性，它有缓存的功能
- actions 就是用来封装业务逻辑，修改 state

## Vue3（Composition API）＋Pinia
- createPinia：创建 Pinia 实例
- defineStore：定义 Store
- storeToRefs：state 也可以使用解构，但使用解构会使其失去响应式，这时候需要用到storeToRefs。
```js
// ----- main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

// ----- stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
        this.counter ++
    },
    decrease() {
        this.counter --
    }
  }
})

// ----- app.vue
<script setup>
// 为了从 store 中提取属性时保持其响应性，你需要使用 storeToRefs()
import { storeToRefs } from 'pinia'
import { useCounterStore } from './stores/counter'

const counterStore = useCounterStore()
const { counter } = storeToRefs(counterStore)
const doDecrease = () => {
  counterStore.decrease()
}
const doIncrement = () => {
  counterStore.increment()
}
</script>

<template>
  <button @click="doDecrease">-</button>
  Counter: {{ counter }}
  <button @click="doIncrement">+</button>
</template>
```
## 总结
Pinia 是一款新兴的状态管理库，它允许开发者将状态存储在一个独立的 Store 对象中，每个 Store 对象都具有自己的state、getters 和 actions 。与 Vuex 不同，Pinia 是分布式的，允许每个 Store 对象都独立工作。

在 Pinia 中，可以通过 createPinia() 函数来创建一个 Pinia 实例，然后使用它来创建一个新的 Store 对象。在 Store 对象中，可以定义 state、getters和 actions，每个属性都是一个函数，同时包含了一些 Pinia 提供的辅助方法。

使用 Pinia 可以将应用程序状态划分为多个 Store 对象，从而实现更好的代码组织和管理，并且通过 Reactivity API，可以使应用程序状态更加响应式。