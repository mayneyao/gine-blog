# gine-blog

gine-blog 是一个以notion为blog后端,基于 React,Gatsby,Material-UI 开发的静态博客应用。


--------
最近好像涨了几颗星星🤔，开始有人关注了，这下不能只顾着自己折腾了。重新整理了一下 master 分支的代码，完善了一些功能。随着 notion 新特性的添加，我也会不断的去适配。


最开始的构想是 master 分支只做通用功能。后来我自己的分支（dev-mayne）陆续迭代，加了很多新功能。两边维护太麻烦了，索性合并成一个。

dev-mayne 是开发分支，会有一些我自己加的个性化功能（部分功能需要配合后端API使用），不管功能是否通用，这些功能都会加入到 master 分支中来。然后通过配置项控制是否开启这些功能，非通用功能默认都是关闭的。后续补充下文档吧，希望大家喜欢。

--------

screenshot
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F56495b11-eb1f-43b2-bef9-9a84c9822251%2Fs3.png?width=3840)

lighthouse report
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F17135e4c-25f5-4599-8e22-7c77a11490d9%2Fgine-blog-lighthouse-report.png?width=1930)


架构图

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0cc8778b-ad42-4732-917e-7a69d3d801f3%2Fgine-blog.png?width=3840)

![给我也整一个](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4ba891b7-e685-40fa-89ee-0b8dd206b8a9%2Fnse-1761695606568594205-852524620.jpg)

## 安装&&运行

```
git clone https://github.com/mayneyao/gine-blog.git

# 如果你要部署到 netlify , 先fork到自己的仓库

# 安装依赖
yarn 

# 开发模式 热更新
yarn develop

# 编译
yarn build

# 本地访问 build之后
yarn serve

```

运行起来后，你可以看到已经有一篇文章，文章是从我的notion表格中获取的。你需要改为自己的notion链接并做其它个性化的配置。

下面是配置指南。

## 配置指南

### 前置条件

clone 下面这个page到自己的notion中,此页面包含了blog需要的2个表(文章表和友链表)。后面你可以根据自己的喜好添加表格，做个性化的开发。

[https://www.notion.so/gine/share-blog-table-60e00520137944a4a45a437c7d089488](https://www.notion.so/gine/share-blog-table-60e00520137944a4a45a437c7d089488)

如何clone notion模板
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7956cbc5-243f-4404-8943-db8b200f044e%2Fhow_to_copy_notion_page.gif)
也可以参考此文章：[https://notionpages.com/how-to-copy-a-notion-template/](https://notionpages.com/how-to-copy-a-notion-template/)


### 基础配置
根据 `config.js` 中的说明，修改为自己的配置。默认配置是最小化的配置，只开启了blog相关的基本功能

- 文章列表页
- 文章详情页
- 全部标签页
- 标签详情页
- 归档
- 友链
- about 页面实际上是一篇post，你需要在配置中写入相关post的slug。

如果需要开启其它模块功能，按照下面的配置文档（参考config.js中的注释）操作即可。

### comment 开启评论

评论模块采用的是disqus，开启后填上自己的短域名即可


### blog 开启github缓存文章加速build 

你需要新建一个仓库用来缓存blog文章内容。
+ 注意这里的仓库需要有文件，初始化添加Readme.md即可

访问 https://github.com/settings/tokens 获取token 

加入token到环境变量

```
export GitHubToken='yourtokenhere'
```

缓存机制

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2a0ab0a6-886c-4361-98d3-c92a99e611ec%2Fgine-blog.png?width=3840)

### bangumi 开启番剧模块

填个b站的链接就好了，会把你订阅的番剧数据爬下来，以卡片形式按番剧发行时间顺序展示。

待续...

## FAQ

### 为什么安装依赖这么慢？
初次安装依赖，会安装puppetter，所以比较慢

可以先单独安装 puppetter
```
sudo npm install -g puppeteer --unsafe-perm=true --allow-root
```

## 更新日志

### 2019-05-28 (dev-mayne > matser)

+ 兼容了 notion TOC 目录。
    + 你可以在文章中使用  /table-content 生成的目录了。
    + 目录会本页正常跳转，而不是跳转到notion页面。
+ 文章搜索功能
    + 需要搭配后端API使用，模拟 notion 的搜索交互。
    + 搜索结果分为文章和文章内的block，点击结果跳转到对应的文章/block。
+ SEO 优化
    + post 添加 keyworld 字段。
+ 优化工作流
    + post 添加 status 字段，控制文章是否发布。
    + "已发布" 为保留状态，你可以定义其它状态，方便使用看板视图。
+ 自定义头图&图片优化
    + 你可以在 notion page 自定义 cover。
    + 不管是默认 cover ，还是上传的 cover 都可以在 blog 中正常表现出来。
    + 列表页的图片尺寸减小，加载速度更快。
+ 书单模块（beta）
    + 维护书单表格，展示书籍和评论。
