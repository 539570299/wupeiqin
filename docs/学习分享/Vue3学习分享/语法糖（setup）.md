---
outline: deep
---
# Vue3语法糖（setup）使用教程
## 1.新生命周期（setup）

::: tip 提示
Vue3删除了create生命周期，其他方法前面加上on进行访问，例如onMounted、onUpdated，同时新增setup属性（比created更早执行，同时setup中this不会指向实例），更贴近于HTML写法，这个方法在onBeforeMounted之前被调用，同时Vue3在生命周期中也删除了this指向，所有的方法需在Vue实例中进行调用。
:::

```vue
<template>
    <div>123</div>
</template>
<script setup>
    // setup写法，自带语法糖（推荐）
    // 在setup中没有this，所有的方法必须引入后使用
    import { ref } from 'vue'
    let up =ref(123)
</script>
```
使用生命周期必须在Vue实例中引用，销毁实例变为onUnmounted，与Vue2中的destroy作用一致
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'
// 所有的生命周期用法均为回调函数
onMounted(() => {
    console.log('创建')
})

// 销毁实例变为onUnmounted，与Vue2的destroy作用一致
onUnmounted(() => {
    console.log('销毁')
})
</script>
```

## 2.Vue3数据及方法绑定
### 2.1使用ref定义数据
::: tip 提示
ref方法用于定义一个响应式数据，在Vue3中，所有的数据都需要使用ref方法进行定义，同时ref方法返回一个对象，该对象包含value属性，用于获取或设置响应式数据。
:::
```vue
<template>
    <div>
        <div>{{ num }}</div>
        <button @click="addNum">num+1</button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
let num = ref(1)
let addNum = () => {
    // 注意，使用ref变成响应式数据的时候，必须通过.value才可以拿到定义的数据
    num.value = num.value + 1
    console.log(`执行了，现在的num是${num.value}`)
    console.log(num)
}
</script>
```

### 2.2使用ref获取DOM元素
::: tip 提示
ref方法可以获取DOM元素，但是需要注意，ref方法返回的对象是响应式的，所以不能直接使用，需要使用.value获取真实的DOM元素。
:::
```vue
<template>
    <div>
        <!-- 模板中无需使用.value，会被自动编译转换成真实数据 -->
        <div ref="box">{{ num }}</div>
    </div>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue'
let num = ref(1)
// 需要获取box这个元素，那么只需要定义一个名字为上方ref相同的名字即可
let box = ref()
// 这么获取得到的是undefined，需要等dom渲染完成后才能获取到，因为setup时候dom还没渲染
console.log(box.value) // undefined
nextTick(() => {
    console.log('nextTIck执行')
    console.log(box.value)
})
onMounted(() => {
    console.log('mounted执行')
    console.log(box.value)
})
</script>
```

### 2.3使用reactive定义数据
::: tip 提示
reactive方法用于定义一个响应式数据，与ref方法类似，但是返回的对象是响应式的，可以直接使用。
:::
```vue
<template>
    <div>
        <div ref="box">{{ data.name }}</div>
        <button @click="setName">修改名字</button>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
let data = reactive({
    name: '张三',
    age: 13,
    sex: '男'
})
const setName = () => {
    // 调用时更像Vue2，不用.value去调用
    data.name = '李四'
    data.age = 35
    data.sex = '女'
}
</script>
```

### 2.4方法绑定
::: tip 提示
methods属性用于绑定方法，与Vue2中的methods属性作用一致，但是在Vue3中，methods属性不再是局部的，所有的方法都需要在setup中定义，并且不需要.value调用。
:::
```vue
<template>
    <div>
        <button @click="setFn"></button>
    </div>
</template>
<script setup>
// 以下方法都可以定义函数，按自己开发习惯定义一种即可
let setFn = () => {
    console.log('匿名函数')
}

function setFn () {
    console.log('普通函数')
}
</script>
```

### 2.5 computed计算属性使用
```vue
<template>
    <div class="box">
        <!-- 在上方调用即可，结果为169 -->
        {{add}}
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
let num1 = ref(13)
let num2 = ref(13)
// 设置个变量接收
let add = computed(() => {
  return num1.value * num2.value
})
```
### 2.6 watch监听数据变化使用
#### 2.6.1 单属性监听
```vue
<template>
    <div class="box">
        <input type="text" v-model="user" />
    </div>
</template>
<script setup>
import { watch, ref } from 'vue'
// 用户名
let user = ref()
// watch监听接收两个或者三个匿名函数
// 第一个是监听的数值，第二个是处理监听函数，第三个是否开启深监听(可选)
watch(() => user.value, (newVal, oldVal) => {
    console.log(`新值：${newVal}, 旧值：${oldVal}`)
}, { deep: true }) // 可选项，是否开启深监听
</script>
```

#### 2.6.2 多属性监听
::: tip 提示
需要监听多属性，需要写多个watch监听
:::
```vue
<template>
    <div class="box">
        <input type="text" v-model="user" />
        <input type="password" v-model="password" />
    </div>
</template>
<script setup>
import { watch, ref } from 'vue'
// 用户名
let user = ref()
let password = ref()

// 监听user
watch(() => user.value, newVal => {
    console.log(`用户名：${newVal}`)
}, { deep: true })

// 监听password
watch(() => password.value, newVal => {
    console.log(`密码：${newVal}`)
})
</script>
```
#### 2.6.3 多属性监听
::: tip 提示
第二种方法相比第一种方法更直接，同时监听多个值只要其中一个值变化，就会触发方法。
:::
```vue
<template>
  <div class="box">
    <input type="text" v-model="user" />
    <input type="password" v-model="password" />
  </div>
</template>
<script setup>
import { watch, ref } from "vue";
// 用户名
let user = ref()
let password = ref()
// 同时监听user和password，只要user或者password其中一个值变化，就会触发下面的方法
watch(() => [ user.value, password.value ], ([ newUser, newPassword ], [ oldUser, oldPassword ]) => {
    console.log(`新的user值：${newUser}`)
    console.log(`旧的的user值：${oldUser}`)
    console.log(`新的pass值：${newPassword}`)
    console.log(`旧的的pass值：${oldPassword}`)
})
</script>
```

## 3.路由
### 3.1路由跳转
```vue
<template>
    <div>
        <button @click="jumpNewPage">跳转首页</button>
    </div>
</template>
<script setup>
// 切记是在vue-router中引入useRouter
import { useRouter } from 'vue-router'
let jumpNewPage = () => {
    // 切记不可将router定义在方法中，这样他不是响应式数据，会报错
    const router = useRouter()
    router.push({ path: '/' })
}
</script>
```

### 3.2路由传参
```vue
<script setup>
// 记住是在vue-router中引入useRouter
import { useRouter } from 'vue-router'
const router = useRouter()
let jumpNewPage = () => {
    // 有两种传参方式，query和params，两者写法不一样，请注意
    // query更像get传参，是显性传参，前面跳转加path路径即可，刷新也还在，
    router.push({ path: '/', query: { name: '首页' }})
    // params更像post，是隐性传参过去，跳转需注意，不使用path跳转，而是用路由中跳转组件的name进行跳转，否则拿不到params
    router.push({ name: 'Home', params: { name: '首页' }})
}
</script>
```

### 3.3路由接收参数
元素使用params跳转，使用params接收即可
```vue
<script setup>
// 引入useRoute,获取是route
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute()
onMounted(() => {
    console.log(route.params) // 结果为{ name: '首页' }
})
</script>
```
元素使用query跳转，使用query接收即可
```vue
<script setup>
// 引入useRoute，获取是route
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute()
onMounted(() => {
    console.log(route.query) // 结果为{ name: '首页' }
})
</script>
```

## 4.组件
### 4.1组件引用
组件在props里直接引入就可在template里直接使用，无需再进行注册。
```vue
<template>
    <div class="box">
        <!-- 子组件引用 -->
        <v-child />
    </div>
</template>
<script setup>
// 引入后无需注册
import vChild from '../components/child.vue'
</script>
```

### 4.2 defineProps传参（父传子）
父元素传递给子元素的数据，子元素使用defineProps进行接收
```vue
// 父元素
<template>
    <div class="box">
        <!-- 子组件引用 -->
        <v-child msg='我给子元素带的一段话' />
    </div>
</template>
​
// 子元素
<template>
    <div class="child">我是子组件</div>
</template>
<script setup>
import { defineProps } from 'vue'
// 在接收时候也得注意，vue3 props接收必须规定数据类型，如果父元素数据类型出错，那么会报错
const props = defineProps({ msg: String })
console.log(props) // Proxy {msg: '我给子元素带的一段话'}
</script>
```

### 4.3 defineEmits传值（子传父）
```vue
// 子组件
<template>
    <div class="child">我是子组件</div>
</template>
<script setup>
import { defineEmits, onMounted } from 'vue'
const emit = defineEmits()
onMounted(() => {
    emit('getChildMsg', '我是子元素，给父元素传的话')
})
</script>
​
// 父组件
<template>
    <div class="box">
        <!-- 接收子组件的方法 -->
        <v-child @getChildMsg="getMsg" />
    </div>
</template>
<script setup>
// 引入后无需注册
import vChild from '../components/child.vue'
let getMsg = e => {
    console.log(e) // 我是子元素，给父元素传的话
}
</script>
```

### 4.4 defineExpose（父拿子方法）
::: tip 提示
在Vue2中是使用this.refs.子组件名称.xxx方法，即可拿到子组件定义的值或者方法，在Vue3中没办法这么拿取，必须子组件暴露后父组件才可以拿取到。
:::
```vue
// 子组件
<template>
    <div class="child">{{val}}</div>
</template>
<script setup>
import { ref, defineExpose } from 'vue'
let val = ref('我是子组件')
let fn = () => {
    val.value = '我改变了子组件'
}
// 暴露val和fn
defineExpose({ val, fn })
</script>
​
// 父组件
<template>
    <div class="box">
        <!-- 接收子组件的方法 -->
        <v-child ref ='child' />
    </div>
</template>
<script setup>
// 引入后无需注册
import vChild from '../components/child.vue'
import { ref, onMounted } from 'vue'
// 获取child实例
let child = ref()
onMounted(() => {
    console.log(child.value.val) // 直接打印：我是子组件，并不需要加.value
    // 执行子组件的fn函数
    child.value.fn()
})
</script>
```