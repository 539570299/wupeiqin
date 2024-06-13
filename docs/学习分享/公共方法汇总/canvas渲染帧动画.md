---
outline: deep
---

# canvas渲染帧动画
代码如下：
```css
.load{position:absolute;left:0px;top:0px;width:100%;height:100%;background:#333;z-index:100;display:none}
.loadWrap{position:absolute;width:100%;height:80px;left:0%;top:45%;margin-top:-25px;}
.loadWrap p{text-align:center;color:#fff;margin-top:15px;font-size:18px;}
.loading2{width:50px;height:50px;margin:0 auto;border-radius:90%;background:#666;position:relative;top:50%;margin-top:-25px;-webkit-animation:turn 1s linear infinite;-moz-animation:turn 1s linear infinite;}
.load p{font-size:11px;text-align:center!important;color:#fff;position:absolute;width:100%;left:0px;bottom:32%}
.loading2:before{content:'';display:block;background:-webkit-linear-gradient(#666,cyan);background:-moz-linear-gradient(#666,cyan);border-radius:0 50px 50px 0;height:50px;width:50%;top:0;position:absolute;right:0;z-index:1;}
.loading2:after{content:'';display:block;border-radius:90%;height:42px;width:42px;top:50%;left:50%;position:absolute;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);background:#333;z-index:1;}
@-webkit-keyframes turn{0%{-webkit-transform:rotate(0deg)} 100%{-webkit-transform:rotate(360deg)}}
@keyframes turn{0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)}}
#canvas{width:100%;height:auto;}
.canvasWrap{position:relative;}
.videoBox{width:6.4rem;height: 100%;background: #ccc;position: relative;overflow: hidden;}
```
```html
<div class="videoBox">
    <canvas id="canvas" width="100%" height="100%"></canvas>
    <p></p>
    <div class="load" id="loadWrap2">
        <div class="loading2"></div>
    </div>
</div>
```
```js
var imgArr=[], source={}, now2=0, imgNum=0, timer=null
var canvas=document.querySelector('#canvas')
var videoBox=document.querySelector('.videoBox')
var view={w:videoBox.offsetWidth, h:videoBox.offsetHeight}
canvas.width = view.w
canvas.height = view.h
var ctx=canvas.getContext('2d')
ctx.clearRect(0, 0, canvas.width, canvas.height)
// 获取像素比（处理画布在retina屏显示模糊）
    var getPixelRatio = function(context) {
        var backingStore = context.backingStorePixelRatio ||
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1
        return (window.devicePixelRatio || 1) / backingStore
    }
    var ratio = getPixelRatio(ctx)
    canvas.style.width = view.w + 'px'
    canvas.style.height = view.h + 'px'
    canvas.width = view.w * ratio
    canvas.height = view.h * ratio
// 添加图片进数组
function pushImgArr(num) {
    document.querySelector('#loadWrap2').style.display='block'
    imgArr = []
    for(var i = 0; i < num; i++) {
        imgArr.push('img/' + i +'.jpg')
    }
    imgLoad()
}
// 图片加载
function imgLoad() {
    source['src' + now2] = new Image()
    source['src' + now2].src = imgArr[now2]
    source['src' + now2].onload = function() {
        now2 ++
        if(now2 > imgArr.length - 1) {
            // 加载成功
            document.querySelector('#loadWrap2').style.display='none'
            // 执行canvas渲染
            movieInit()
        } else {
            // 递归加载
            imgLoad()
        }
    }
}
// canvas图片渲染
function movieInit() {
    clearInterval(timer)
    timer = setInterval(function() {
        if(imgNum === imgArr.length) {
           clearInterval(timer)
        } else {
           ctx.clearRect(0, 0, canvas.width, canvas.height)
           ctx.drawImage(source['src'+imgNum], 0, 0, canvas.width,canvas.height)
           imgNum++
        }
    }, 60)
}
// 执行
pushImgArr(435)
```