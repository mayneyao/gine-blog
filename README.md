# gine-blog

gine-blog 是一个以notion为blog后端的,基于 React,Gatsby,Material-UI 的静态博客应用。


screenshot
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F56495b11-eb1f-43b2-bef9-9a84c9822251%2Fs3.png?width=3840)

lighthouse report
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F17135e4c-25f5-4599-8e22-7c77a11490d9%2Fgine-blog-lighthouse-report.png?width=1930)


架构图如下

假装这里有图.jpg

![给我也整一个](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4ba891b7-e685-40fa-89ee-0b8dd206b8a9/nse-1761695606568594205-852524620.jpg?AWSAccessKeyId=ASIAT73L2G45PON4DKY7&Expires=1551441911&Signature=LBy9umDqV4ZaO1IwcIcL3CeV7OU%3D&response-content-disposition=filename%20%3D%22nse-1761695606568594205-852524620.jpg%22&x-amz-security-token=FQoGZXIvYXdzEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDPTu56HwoFmTqdA%2FqyK3A5pmn%2FNvEOU2qyAXr0A%2BDMkqLXezoksK1DEihu3F5MR3Gc8t7Lf2YkCfv6Le0I1JJMTdVBmytyAHYMsLEWC6Ox87d26PWKjaxSZLOFbxLqLtJ%2BEWjluzXxd2Y3sxSZU7h0zrqp4rYfHHIfdCAL%2FWVZlvEfJ8MWD5giSxG9bpbzePJQuDhyFjoxFLaSsiE%2F6gZtHDWUID1CbWP3tkzNOU43tNGQo8DPU%2F%2FRpAGawmXNkdN5973NAuMOER2dTrRrOCgiPZBRaeSoY%2FKQ64DxlMy5ZTPPpOPtdFb8ztk4%2F9sPrLyXeMnXcOU%2Fkk29mcid%2F7bqvTrCA3L3%2F0gMXNdI%2FRaSWfK3XoKhKYaR8QczGaYaIGu5QYZWKmLEDUeSiFxRXCxmmQfnENt3iSXm96WkyLp46Xr8RW2enjtEFXJYBnXemzUYGC1PQZ01YDVUQl6f2jSpov%2FhlHgcoFqdIoRhewBhqnGtZrRYjTTa9yT%2BWTYjdJqvVA2Xc5nPQMjthsmw%2BcOfTiYCKMcmFoB29qCkdX2%2Fn9WaZ7z1deRzJYecaqa6EyOtDv4q1bqsoHxwUlyllT%2Bc9VgLiibW4ok7%2Fe4wU%3D)

## 安装&&运行

```
git clone https://github.com/mayneyao/gine-blog.git

# 安装依赖
yarn 

# 开发模式 热更新
yarn develop

# 编译
yarn build

# 本地访问 build之后
yarn serve

```


运行起来后，你可以看到已经有一篇文章，文章是从我notion的表格中获取的。你需要修改配置，改为自己的notion链接并做个性化的配置。

下面是配置指南。

## 配置指南

### 前置条件

clone 下面这个page到自己的notion中,此页面包含了blog需要的2个表(文章表和友链)。后面你可以根据自己的喜好添加表格，做个性化的开发。

[https://www.notion.so/gine/share-blog-table-60e00520137944a4a45a437c7d089488](https://www.notion.so/gine/share-blog-table-60e00520137944a4a45a437c7d089488)

如何clone notion模板
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7956cbc5-243f-4404-8943-db8b200f044e%2Fhow_to_copy_notion_page.gif)
也可以参考此文章：[https://notionpages.com/how-to-copy-a-notion-template/](https://notionpages.com/how-to-copy-a-notion-template/)


### 基础配置
根据 `config.js` 中的说明，修改为自己的配置。

默认配置是最小化的配置，只开启了blog相关的基本功能

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

访问 https://github.com/settings/tokens 获取token 

加入token到环境变量

```
export GitHubToken='yourtokenhere'
```

### bangumi 开启番剧模块

填个b站的链接就好了，会把你订阅的番剧数据爬下来，以卡片形式按番剧发行时间顺序展示。

待续...

## FAQ

### 为什么安装依赖这么慢？
初次安装依赖，会安装puppetter，所以比较慢