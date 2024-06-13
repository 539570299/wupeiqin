---
outline: deep
---

# Nuxt3基础包使用说明
## ✏️ 简介
一个支持服务端渲染的前端开发基础包，可以做为需要 SSR 项目的开发基础通用模板，它帮助你解决SPA（单页应用）中的SEO问题，提高页面加载速度，改善用户体验。
Nuxt3 基础包是基于 Nuxt3 构建的，支持了 Vue3+TypeScript+Pinia 和 Vite 等主流技术。

## 🔖 特性
- Vue3：采用 Vue3 + script setup 最新的 Vue3 组合式 API
- Pinia: 状态管理器
- Vite：打包工具，真的很快
- TypeScript：JavaScript 语言的超集
- Sass：选择和 Element Plus 保持一致
- ESlint：代码校验
- Prettier：代码格式化
- 配置说明：各个配置项都有写尽可能详细的文档

## 📝 目录结构
```md
nuxt-template              
├─ src                     
│  ├─ api                  
│  │  ├─ home.ts           
│  │  └─ index.ts          
│  ├─ assets               
│  │  └─ styles            
│  │     ├─ home.scss      
│  │     └─ variable.scss  
│  ├─ components           
│  ├─ composables          
│  │  └─ index.ts          
│  ├─ layouts              
│  │  └─ default.vue       
│  ├─ middleware           
│  │  └─ mobile.global.ts  
│  ├─ pages                
│  │  ├─ m                 
│  │  │  ├─ news           
│  │  │  │  └─ index.vue   
│  │  │  └─ index.vue      
│  │  └─ pc                
│  │     ├─ news           
│  │     │  └─ index.vue   
│  │     ├─ index.vue      
│  │     └─ [...slug].vue  
│  ├─ plugins              
│  │  └─ swiper.ts         
│  ├─ public               
│  │  └─ favicon.ico       
│  ├─ stores               
│  │  ├─ home.ts           
│  │  └─ index.ts          
│  ├─ utils                
│  │  ├─ http.ts           
│  │  └─ rem.ts            
│  └─ app.vue              
├─ nuxt.config.ts          
├─ package-lock.json       
├─ package.json            
├─ README.md               
├─ tsconfig.json           
└─ yarn.lock               
```
### .nuxt 目录
Nuxt 使用.nuxt/目录在开发中生成您的Vue应用程序。
### .output 目录
Nuxt在为生产构建应用程序时创建.output目录。
### api目录
存放后端接口的目录，方便接口管理。
### assets目录
顾名思义，这是静态资源档桉所放置的位置。
### components目录
放置所有 Vue 组件的地方，Nuxt自动导入你的components目录中的任何组件
### composables目录
组合式函数放置的目录，简单来说可以把常用或通用的功能写成一个共用的函数或 JS 文件，放置在这个目录视为组合式函数，Nuxt 也会自动导入这些组合式函数，让需要使用的页面或组件中可以直接做使用。
### layouts目录
用于放置通用或可能重複使用到的布局模板，布局放在layouts/目录中，使用时将通过异步导入自动加载。
### middleware目录
Nuxt 3 提供了路由中间件的概念，用以在导航到下一个页面之前执行一些拦截处理，如权限验证。
### pages目录
Nuxt 3 会自动整合 vue-router，在 pages/ 目录下建立目录或者文件，Nuxt会依据目录结构规则来自动产生出对应路由，也是 Nuxt3 产生路由的方式。需要注意的是在这个基础包当中，如何要分pc和移动两端，需要将目录或者文件建立在pc和m下面的目录下。
### plugins目录
Nuxt 会自动载入这个目录，作为插件使用。
### store目录
Pinia 的状态管理目录
### app.vue文件
Nuxt 3 网站的入口文件。
### nuxt.config.ts 文件
Nuxt 项目的配置文件。

## 🚀 开发
以下使用 npm 的命令同样也可以使用 yarn 进行：
```md
# 配置
1. 先决条件
2. node 版本 16+
3. npm 版本 7.x
# 项目地址
https://ptgit.g-bits.com/leiting/web/ltTemplate

# 克隆项目
git clone https://ptgit.g-bits.com/leiting/web/ltTemplate.git

# 进入项目目录
cd nuxt-tempalte

# 安装依赖
npm install 

# 启动服务
npm run dev 
```
## ✔️ 预览
```md
# 预览测试环境
npm run build:test
npm preview

# 预览正式环境
npm run build:prod
npm preview
```

## 📦️ 多环境打包
```md
# 构建测试环境
npm run build:test

# 构建正式环境
npm run build:prod
```

## 🔧 代码格式检查
```md
npm lint
``