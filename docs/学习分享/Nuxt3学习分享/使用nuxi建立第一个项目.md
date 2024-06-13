---
outline: deep
---

# 使用nuxi建立第一个项目
## 安装
开始之前，根据 Nuxt3 官网的 [Nuxt3 安装](https://nuxt.com/docs/getting-started/installation)，这里需要注意以下node.js的版本，建议使用 v16.10.0 或者最新的版本 newer 。我这里使用的是v16.15.0
![node版本](https://ossstatic.leiting.com/web/common/docs/images/node.png)

## 使用 nuxi 建立 Nuxt 3 项目
[nuxi](https://www.npmjs.com/package/nuxi) 全名为 Nuxt Command Line Interface，是由 Nuxt 提供开发的构建工具。打开终端，cd到自己需要的目录下，用以下命令创建项目，在此，我们的项目名命名为 nuxt-template
```md
npx nuxi init nuxt-template
cd nuxt-template
```
![nuxt-template](https://ossstatic.leiting.com/web/common/docs/images/nuxt-template.png)

安装依赖项和启动项目
```md
yarn install
yarn dev -o
```
![yarn-install](https://ossstatic.leiting.com/web/common/docs/images/yarn-install.png)

根据提示，项目正常启动后您可以再浏览器中输入网址 http://localhost:3000/ ，如看到下面的页面，恭喜你，已经成功建立第一个 Nuxt3 的项目了。

![nuxt](https://ossstatic.leiting.com/web/common/docs/images/nuxtopen.png)

nuxt3刚创建的时候项目结构比较简单：
```md
--.nuxt
--node_modules
--.gitignore
--app.vue
--nuxt.config.ts
--package.json
--README.md
--tsconfig.json
```

现在，打开目录，找到 app.vue， 这个是Nuxt项目的入口，我们可以看到app.vue显示如下：

![app.vue](https://ossstatic.leiting.com/web/common/docs/images/app.png)

我们可以看到有个 <NuxtWelcome />，这个是个什么东西？相对于vue3 的组件来说，也没有看到 import 引入？其实呢，这就是刚刚在浏览器中看到的欢迎页面，是nuxt自带的一个组件，而且是通过nuxt的自动引入进来的。在这里我们把它移除掉，然后写入其他内容。
![hello-nuxt3](http://ossstatic.leiting.com/web/common/docs/images/hellonuxt3.png)

在实际开发开中，需要按照官网给的标准目录结构，可以参考：https://nuxt.com/docs/guide/concepts/auto-imports
```md
--nuxt：开发环境生成的包
--.output：开发环境生成的包
--assets：资源目录，一般存放css一些需要生成base64的小图。 注意：大图放在public目录下
--components：组件目录，这里的组件可以自动导入您的页面和其他组件中，不需要再用import引入
--composables：Nuxt3支持使用自动composables/导入，自动将您的 Vue 组合导入到应用程序中
--content：Nuxt内容模块读取content/项目中的目录并解析.md、和文件.yml，为您的应用程序创建基于文件的 CMS。.csv.json
--layouts：布局框架，可以整个应用中使用，公共的header好footer可以放在这里进行搭建
--middleware：中间件框架，可进行导航路由拦截处理
--node_modules：依赖包
--pages：页面目录。 
--plugins：插件目录，导入外部插件必须放在此目录下，Nuxt 将自动读取您plugins目录中的文件并加载它们。
--public：和vue的static目录一样，该public/目录直接在服务器根目录中提供，并包含必须保留其名称。 有意思的是，在public下的images可以直接使用/images/xxx.jpg, 而不需要使用过public/images/xxx。jpg
--server：服务器处理的相关目录，目前没有使用
--.gitignore：git忽略文件
--app.vue： Nuxt应用程序中的主要组件，启动文件。 结合page目录进行使用
--.nuxtignore ：Nuxt的忽略文件。
--nuxt.config.ts: nuxt的所有配置都在这里了， 很重要！
--package.json：所有依赖项
--tsconfig.json： ts配置
```
## Nuxt CLI 常用指令
我们刚刚使用了nuxi init 指令是来初始化第一个项目，接下来简单的介绍一下常用的一些指令，有兴趣翻阅完成的指令的话可以参考 [Nuxt 3 官方文档](https://nuxt.com/docs/api/commands/add)

### nuxi init
```md
npx nuxi init <project-name>
```
这里的 nuxi init 指令是用来初始化 Nuxt 项目的，也就是新建一个 Nuxt 项目。

### nuxi dev
```md
npx nuxi dev [--open, -o] [--port, -p]
or
yarn dev -o
```
本地开发时，执行 nuxi dev -o 启动项目，其中的  -o 表示服务启动后开启浏览器。

## 小结
以上，主要是介绍如何使用 Nuxt 的指令创建一个新的项目，并简单的介绍了一下Nuxt的目录结构和Nuxt Cli常用的命令。