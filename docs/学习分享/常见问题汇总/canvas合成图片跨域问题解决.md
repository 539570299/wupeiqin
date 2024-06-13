---
outline: deep
---

# canvas合成图片跨域问题解决
::: tip 前言
前端静态资源分离项目在使用 canvas 合成图片时存在跨域问题，在<span style="color:red"> 运维配置了相关域名间允许跨源通信后</span>，在前端开发过程中还需要注意图片的使用方式，以下记录目前合成图片主要用到的几种方式需要注意的地方。
:::
## 合成海报技术流程
![canvas](https://ossstatic.leiting.com/web/common/docs/images/canvas.png)

## 代码
<span style="color:red">*注：以下代码只提供相关细节，无法直接复制使用，需根据使用的框架自行编写相关代码。</span>

### 方式一：通过 img 标签加载跨域图片
```html
<img id="poster" src="" crossorigin="anonymous">
```
```js
document.getElementById('poster').src = `${imgSrc}?time=${new Date().valueOf()}`
```
### 方式二：通过 js 动态创建 Image 对象
```js
var bg = new Image()
bg.crossOrigin = 'anonymous'
bg.onload = function() {
    // onload to do something
}
bg.src = `${imgSrc}?time=${new Date().valueOf()}`
```
## 参考资料
[html2canvas官方Api文档](https://html2canvas.hertzen.com/configuration)