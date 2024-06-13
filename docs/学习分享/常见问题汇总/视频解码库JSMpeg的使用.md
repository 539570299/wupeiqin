---
outline: deep
---

# 视频解码库JSMpeg的使用
## 应用场景
<span style="color:red">H5移动端全屏播放视频</span>

主要规避了原生video标签存在的如下兼容问题：
- 原生UI不一致
- 国产浏览器对播放器劫持（点名：QQ浏览器、百度浏览器、UC浏览器......）
- 内联播放且视频层级无法覆盖
- [其他问题](https://yunchangyue.github.io/blog/mobile/2019/07/26/mobile-video/)

## JSMpeg介绍
- 一个用 JavaScript 编写的视频播放器
- 由 MPEG-TS 解复用器、MPEG1 视频和 MP2 音频解码器、WebGL 和 Canvas2D 渲染器和 WebAudio 声音输出组成
- 可以通过 Ajax 加载静态视频，并允许通过 WebSockets 进行低延迟流式传输（约 50 毫秒）
- 可以在 iPhone 5S 上以 30fps 的速度解码 720p 视频
- 可以在任何现代浏览器（Chrome、Firefox、Safari、Edge）中使用，并且压缩后仅 20kb
## 开发流程
### 1.准备视频资源
#### FFmpeg
##### 介绍
- [FFmpeg 视频处理入门教程|阮一峰](https://www.ruanyifeng.com/blog/2020/01/ffmpeg.html)
- [FFmpeg|官网](https://www.ffmpeg.org/)
##### 安装
- [知乎|ffmpeg详细安装教程](https://zhuanlan.zhihu.com/p/635915080)
##### 使用
- [简书|ffmpeg使用教程](https://www.jianshu.com/p/2c00a1a59af1)
#### 栗子1：将MP4格式转码为TS格式
将1.mp4视频转码为视频mpeg1video编码，码率3500k，等比缩放成宽度750px，音频mp2编码的out.ts视频
```md
ffmpeg \
-i 1.mp4 \
-f mpegts -codec:v mpeg1video -b:v 3500k -vf scale=750:-1 -codec:a mp2 \
out.ts
```
#### 栗子2：截取视频指定时长的片段
```md
ffmpeg \
-ss 00:00:00 -t 00:00:05 \
-i 1.mp4 -f mpegts -codec:v mpeg1video -b:v 3500k -vf scale=750:-1 -codec:a mp2 \
out1.ts
```
#### 栗子3：静态帧视频
```md
ffmpeg \
-r 1 -f image2 -loop 1 -i demo.jpg -t 2 \
out.mp4
```
### 相关代码
#### 1.引入JSMpeg库
```html
<script src="//static.leiting.com/lib/jsmpeg.min.js"></script>
```
#### 2.放置视频容器
```html
<canvas id="video"></canvas>
```
#### 3. 创建视频对象（详细参数配置见[官方文档](https://github.com/phoboslab/jsmpeg)）
```js
var demo = new JSMpeg.Player('//ossstatic.leiting.com/web/wd/202108/call/video/0.ts', {
    canvas: document.getElementById('video'), // 容器id
    throttled: false, // 这里设置为false，不然不触发onSourceCompleted事件
    chunkSize: 4 * 1024 * 1024, // 使用分块加载数据时，一次加载的块大小。默认1024*1024(1mb)
    progressive: false, // 是否分块加载数据
    loop: false, // 是否循环播放视频。默认true
    onSourceCompleted: () => {
        console.log('completed')
    },
    onPlay: () => {
        console.log('play')
    },
    onPause: () => {
        console.log('pause')
    },
    onEnded: () => {
        console.log('end')
    },
    onStalled: () => {
        console.log('没有足够的数据用于播放')
    },
    onSourceEstablished: () => {
        console.log('第一次收到数据')
    }
})
```
#### 4.播放视频
```js
demo.audioOut.unlock() // 需要用户交互以解锁音频功能
demo.play() // 播放视频
```
#### 5.销毁视频对象
```js
demo.destroy()
```
#### 6.播放完毕回到第一帧
```js
……
onEnded: () => {
    demo.currentTime = 0
    demo.play()
    demo.stop()
}
……
```
## 测试结果
<span style="color:red">iOS：系统版本 ≥ 12没问题，< 12 globalThis报错（尚无解决方案），官网demo正常播放但是没有声音。<br>Android：系统自带浏览器多次出现音画不同步的情况，通过加一段黑屏视频大大减少该情况发生概率。</span>

![表格](https://ossstatic.leiting.com/web/common/docs/images/testrulest.png)

## 问题归档
- 分块加载数据时提示跨域
    - 源站未配置允许跨域
    - oss的Access-Control-Allow-Headers配置成了content-type,Authorization，需改为*
- 码率的选择（源自某度）
    - 1080*720的分度辨率，用5000K左右
    - 720*576的分辨率，用3500K左右
    - 640*480的分辨率，用1500K左右
- 第一段视频在安卓大部分原生浏览器上出现音画不同步的现象
    - 在第一段视频开始前先后台播一段1s的视频
- iOS < 12报错globalThis未找到
    - 检测iOS版本，小于12则提示用户升级版本
## 相关活动
[奥比岛种树H5](https://acts.leiting.com/aobi/202204/h5/index)