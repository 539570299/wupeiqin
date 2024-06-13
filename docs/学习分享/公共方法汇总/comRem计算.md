---
outline: deep
---

# 公共rem计算
::: tip 介绍
适用于双端的rem适配方案
:::

## 使用方法
封装公共组件
```js
var comRem = {
    el: document.getElementById('comRem'),
    defaultSize: 750,
    setSize: function(size) {
        // 设置计算尺寸
        // size: 计算尺寸
        this.size = parseInt(size) || this.defaultSize
        this.remReSize()
    },
    remReSize: function() {
        var t = (document.documentElement.clientWidth / this.size).toFixed(2)
        document.documentElement.style.setProperty('font-size', 100 * t + 'px')
        // 浏览器默认字号16，6.25 * 16 = 100px = 1rem
    },
    init: function() {
        var size = this.defaultSize;
        if(this.el) {
            size = parseInt(this.el.getAttribute('data-size') || this.defaultSize);
        }
        this.setSize(size)
        window.addEventListener('resize', function () {
            comRem.remReSize()
        }, false)
    }
}
comRem.init()
```
假设加载上面组件并自定义设计稿尺寸
```html
<script id="comRem" src="//xxx.com/comRem.js" data-size="1920"></script>
```
## 相关API
### 一般选项
| 参数 | 默认 | 示例 |
| :----: | :----: | :----: |
| data-size | 750 | 1920 |

### 属性
| 参数 | 描述 | 示例 |
| :----: | :----: | :----: |
| size | 当前设置的计算属性 | comRem.size |
| defaultSize | 默认的计算属性，默认750 | comRem.defaultSize |

### 方法
| 方法 | 参数 | 描述 | 示例 |
| :---- | :---- | :---- | :----: |
| setSize(size) | 必填，默认750 | 设置设计稿宽度，引入该插件后会自动调用，对于特殊情况需要修改rem计算尺寸时手动调用。 | comRem.setSize(1920) |