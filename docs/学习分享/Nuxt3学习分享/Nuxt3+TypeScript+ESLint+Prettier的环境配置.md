---
outline: deep
---
# Nuxt3+TypeScript+ESLint+Prettier的环境配置
## 前言
工欲善其事，必先利其器。在创建好 Nuxt 初始项目后，要开始开发前，应该将项目的环境搭建好。项目开发每个人都有自己的风格，不同人的风格肯定是不一样的，这个时候就需要一些配置对代码进行管理。接下来，将一步步配置 Nuxt3 开发时的环境配置，包含了 TypeScript + ESLint + Prettier。

## TypeScript
Nuxt 3 已经有内置支持 TypeScript，TypeScript 可以在根目录的 tsconfig.json 进行配置。
启动类型检查：

### 安装 Vue 检查插件 [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/vue-tsc) 
vue-tsc 是对 TypeScript 自身命令行界面 tsc 的一个封装。它的工作方式基本和 tsc 一致。除了 TypeScript 文件，它还支持 Vue 的单文件组件。你可以在开启 Vite 开发服务器的同时以侦听模式运行 vue-tsc，或是使用 [vite-plugin-checker](https://vite-plugin-checker.netlify.app/) 这样在另一个 worker 线程里做静态检查的插件。
```md
npm install -D vue-tsc
```

### IDE 支持
Vue Language Features (Volar):  是官方的 VSCode 扩展，提供了 Vue 单文件组件中的 TypeScript 支持，还伴随着一些其他非常棒的特性。
TypeScript Vue Plugin（Volar）: Vue 的 TypeScript 插件。

### 配置 nuxt.config.ts
在 nuxt.config.ts 中 设置 typescript.typeCheck: true 来启用严格的类型检查：
```md
export default defineNuxtConfig({
  typescript: {
    strict: true
  }
})
```

## ESLint
ESLint 是目前一个最为常用的 JavaScript Linter，主要的作用是为了统一风格，让大家在团队合作当中更加的遵守规则进行开发，确保了代码的可维护性。ESLint 除了提供使用大公司如 Google、Airbnb 等的规则配置来作为检查标准外，也可以根据自己喜好或团队共识的规则设定规则。
根据官网的 [use-eslint](https://nuxt.com/docs/community/contribution#use-eslint) 配置 ESlint。

### 安装插件
```md
npm install -D eslint @nuxtjs/eslint-config-typescript eslint-plugin-vue
```

### 配置 ESLint
在根目录下建立 .eslintrc文件
```md
{
  "root": true,

  "env": {
    "browser": true,
    "es2021": true,
    "es6": true,
    "node": true
  },

  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 12,
    "ecmaFeatures": {
      "jsx": true,
      "tsx": true
    }
  },

  "extends": [
    "@nuxtjs/eslint-config-typescript", 
    "plugin:vue/vue3-recommended",
    "prettier"
  ],

  "plugins": ["prettier"],
  
  "rules": {
    "prettier/prettier": "error",
    "vue/multi-word-component-names": "off", // 关闭eslint检查文件名是否为驼峰命名
    "@typescript-eslint/no-inferrable-types": "off" // 关闭type的类型推断
  }
}
```

## Prettier
Prettier 是代码格式化的工具，也可以与 ESLint 进行搭配，ESLint 与 Prettier 就能各司其职将 JaveScript 与 Vue 等依照配置进行检查。

### 为什么要使用 Prettier
- 当 ESLint 遇到代码不符合规则的时候，会提示你违反规则，让你修改代码以符合规则。
- 而 Prettier 则不会这么麻烦，它根本不管你之前符不符合什么规则，都先把你的代码解析成 AST，然后按照它自己的风格给你重新输出代码。
换句话说，Prettier 对应的是各种 ESLint 的 rules 这一类规则。而且你用了 Prettier 之后，就不会再违反这类规则了！不需要你自己手动修改代码。
Prettier 并不会取代 ESLint ，而是能避免你的代码和这些 ESLint 定义的 rules 冲突。ESLint 检查出来违反 Code-quality rules 的情况后还需要你自己根据业务逻辑和语法手动修改。Prettier 帮你格式化代码，但是不会帮你挑出潜在的错误。
那么既要让 Prettier 帮你格式化代码，还想让 ESLint 帮你挑出潜在的 Code-quality 类错误，怎么办？就需要 Prettier 和 Linters 配合使用。
Prettier 和 Linters 的整合需要做两件事：
1. 禁用 ESLint 自己的 Formatting rules，让 Prettier 接管这些职责。这些配置有现成的 Config，ESLint 的配置继承这个 Config 就可以了。
2. 让 ESLint 执行时首先能够调用 Prettier 格式化，然后再检查 Code-quality 类规则。这是 由 ESLint 的 Plugin 实现的。

### 配置 Prettier
1. 安装插件
```md
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```
2. 配置 Prettier 
在根目录下建立 .prettierrc文件
```md
{
  "printWidth": 120, // 每行文字超过 120 字符折行
  "tabWidth": 2, // tab缩进大小,默认为2
  "useTabs": false, // 使用tab缩进，默认false
  "semi": false,  // 使用分号, 默认true
  "singleQuote": true, // 使用单引号, 默认false
  "trailingComma": "none"  // 行尾逗号
}
```
建立了.prettierrc文件，我们需要在 ESLint 的 .eslintrc.js 进一步配置，在 extends 添加字串 prettier 表示使用 eslint-config-prettier 扩充配置，主要用来防止 Prettier 与 ESLint 发生冲突，让其可以用来禁用 ESLint 的格式化；接着在 plugins 中添加 prettier 字串表示使用 eslint-plugin-prettier 扩充，让 ESLint 可以提示我们格式有错误的地方。

## 参考资料
- [Prettier 官网](https://prettier.io/)
- [Prettier Github](https://github.com/prettier/prettier)
- [Prettier 看这一篇就行了](https://zhuanlan.zhihu.com/p/81764012?from_voters_page=true)