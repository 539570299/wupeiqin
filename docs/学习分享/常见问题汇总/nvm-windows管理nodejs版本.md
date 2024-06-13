---
outline: deep
---

# 安装nvm-windows管理nodejs版本
::: tip 前言
nvm是一个nodejs的版本管理工具，可以通过nvm安装和切换不同版本的nodejs。

在为Windows安装nvm之前，先卸载Node.js的任何现有版本(否则会有相互冲突的版本)。删除任何现有的Node.js安装目录。
:::
## 下载nvm
安装包地址：https://github.com/coreybutler/nvm-windows/releases

建议直接下载 nvm-setup.zip 进行安装，或者群里直接下载 nvm-setup.exe
## 安装nvm
1. 双击 nvm-setup.exe 进行安装，按照提示进行下一步操作。
2. 安装结束之后在命令窗口输入相关命令：nvm version，如果显示版本号，则安装成功。

![nvmver](https://ossstatic.leiting.com/web/common/docs/images/nvmver.png?v=1)

## nvm 使用
常用命令，如下图所示:

![nvmhelp](https://ossstatic.leiting.com/web/common/docs/images/nvmhelp.png)

| 命令 | 说明 |
| :---- | :---- |
| nvm version | 查看nvm版本 |
| nvm list | 查看所有已经安装的Nodejs版本 |
| nvm root | 查看nvm安装路径 |
| nvm arch | 查看节点是否以32位或64位模式运行 |
| nvm current | 查看当前node版本 |
| nvm proxy | 查看设置与代理 |
| nvm on | 启用node.js版本管理 |
| nvm off | 禁用node.js版本管理 |

### 使用nvm安装node版本：nvm install 14.15.4
![nvminstall](https://ossstatic.leiting.com/web/common/docs/images/nvminstall.png)

<span style="color:red">Tip：安装结束后可以继续 nvm install xxx 安装多个版本。</span>

### 查看已安装的node版本：nvm list
![nvmlist](https://ossstatic.leiting.com/web/common/docs/images/nvmlist.png)

同时在我们指定的nvm安装目录也会出现对应的nodejs版本：

![nvmdir](https://ossstatic.leiting.com/web/common/docs/images/nvmdir.png)

### 切换node指定版本：nvm use 18.17.1
![nvmuse](https://ossstatic.leiting.com/web/common/docs/images/nvmuse18.17.1.png)

安装版本
| 命令 | 说明 |
| :---- | :---- |
| nvm install latest | 安装最新稳定版Nodejs |
| nvm install 18.17.1 | 安装指定 18.17.1 版本 |
| nvm uninstall 18.17.1 | 卸载指定 18.17.1 版本 |

切换版本
| 命令 | 说明 |
| :---- | :---- |
| nvm use 版本号 | 切换版本（全局） |
| nvm use 18.17.1 | 切换到 18.17.1 版本 |