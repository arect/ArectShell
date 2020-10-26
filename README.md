# ArectShell

一个用前端模拟的控制台网页。

启发于[Axton: About Me](https://axton.cc/)，于是打算自己也做一个。

正在持续制作中，目前只实现了界面和ls、cd、clear、shutdown。

## 已实现的命令

|命令|补充|
|:---:|:---:|
|about||
|cat||
|cd||
|clear||
|help|例如ls --help或者直接help|
|html|类似于cat只不过是以html的形式输出|
|ls||
|shutdown|只是定向到空白页面|

## 已知问题

1. 首次打开/刷新网页后点击“input here”仍然会失焦但是没有显示；
2. ~~输入的命令参数如果带有HTML片段会被显示出来。~~

*正在准备sudo，如果是不输入密码的那种应该不难，但是我想试试能输入密码的*
