---
outline: deep
---

# APNG格式图片应用

## 前言
关于APNG的支持情况，以及适用场景此处不做详细说明。

直接上结论，目前APNG格式在双端[支持情况较好](https://caniuse.com/?search=apng)（除了IE浏览器），优势如下：
- 替代GIF格式的使用场景，相较GIF拥有更加丰富的色彩
- 替代序列帧的部分使用场景，减少开发者编写动画代码的工作量

## 在开发中如何使用？
1. 设计师提供多张png格式的序列帧（如：ani_01.png、ani_02.png……）
2. 下载[APNG汇编程序](https://apngasm.sourceforge.net/)
3. 生成APNG格式

![anpg](https://ossstatic.leiting.com/web/common/docs/images/anpg.png)

- 将序列帧拖入程序
- 设置每帧的间隔时长（如：1/8表示每1秒8帧）
- 选择需要保存的路径
- 生成

4. 将生成的素材在浏览器中预览效果

## 相关链接
- [Can I use](https://caniuse.com/?search=apng)
- [APNG汇编程序](https://apngasm.sourceforge.net/)
- [序列帧合成](https://www.toptal.com/developers/css/sprite-generator)