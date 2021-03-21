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
|date|输出日期|
|echo|甚至还有一些变量|
|help|例如ls --help或者直接help|
|html|类似于cat只不过是以html的形式输出|
|ls||
|mkdir||
|screenfetch||
|shutdown|只是定向到空白页面|
|su|可切换为root或visitor|

## 已知问题

1. 首次打开/刷新网页后点击“input here”仍然会失焦但是没有显示；
2. 命令历史光标不够完善。

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

### 提供的函数

1. `prompt.getFullDir()`可以获得一个完整的字符串形式的路径，例如"/home/visitor"；
2. `shell.fileTree`为文件树；
3. `shell.getCurrentLocation()`可以获得当前目录的指针；
4. `shell.findFather(dir)`可以获得dir文件的父文件夹指针；
5. `shell.getUserDir()` 可以获得当前用户目录的指针；
6. `shell.enterTargetDir(path)`可以获得指定path的文件指针，可以是字符串形式也可以是字符串数组形式，例如："/home/visitor"或`["home", "visitor"]`。

*出于个人习惯，将“引用“称呼为“指针”。*

## 下一步

1. 正在准备`sudo`，如果是不输入密码的那种应该不难，但是我想试试能输入密码的 *（搁置）*；
2. 差不多该发布正式版了，接下来应该是找bug修bug，优化逻辑，检查历史遗留问题。
