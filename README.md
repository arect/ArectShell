# ArectShell

一个用前端模拟的控制台网页。

启发于[Axton: About Me]( https://axton.cc/ )，于是打算自己也做一个。

正在持续制作中。

## 已实现的命令

|命令|补充|
|:---:|:---:|
|cat||
|cd||
|clear||
|echo|甚至还有一些变量|
|help|例如ls --help或者直接help|
|html|类似于cat只不过是以html的形式输出|
|ls||
|mkdir||
|screenfetch||
|shutdown|只是定向到空白页面|

## 已知问题

1. 首次打开/刷新网页后点击“input here”仍然会失焦但是没有显示；
2. ~~输入的命令参数如果带有HTML片段会被显示出来。~~

## 开发

### 为Shell添加自己的命令

创建一个js文件，可以在`template.js`的基础上修改，内容主要是一个`Vue`变量，包含`main`和`help`两个函数。
`main`是输入命令后执行的函数，`help`是获取帮助时返回的信息。
关于返回值也有规定，两个函数需要返回一个对象数组，格式为：
```javascript
[
    {isHtml: Boolen, result: String},
]
```
`isHtml`标记这个结果是否要以HTML输出，否则输出纯文本，`result`返回纯文本。

编写好js文件以后，在`main.js`中加入你的文件，在尾部添加：
```javascript
document.write("<script type='text/javascript' src='[YOUR FILE]'></script>");
```
然后在`index.html`内变量`inputCommand`的`data`的`command`对象数组添加你的变量：
```javascript
{name: "template", variable: template}
```

---

*正在准备`sudo`，如果是不输入密码的那种应该不难，但是我想试试能输入密码的*
