# gine-blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/c9191dcb-f9c1-4b8c-8ec7-fbca94456c84/deploy-status)](https://app.netlify.com/sites/gine/deploys)

gine-blog 是一个以notion为blog后端,基于 React,Gatsby,Material-UI 开发的静态博客应用。

screenshot
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F56495b11-eb1f-43b2-bef9-9a84c9822251%2Fs3.png?width=3840)


![给我也整一个](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4ba891b7-e685-40fa-89ee-0b8dd206b8a9%2Fnse-1761695606568594205-852524620.jpg?width=150)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/mayneyao/gine-blog" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>


## 使用文档

https://gine.me/posts/a788c3e6713e4166a4a8c72a7977b457

## 更新日志

### 2019-06-03 (dev-mayne > matser)
+ 使用 netlify lambda function 实现了 notion table to json 接口。
    + 将任意公开的 notion 表格 转换成 Json 数据。
+ 使用 netlify lambda function 实现了 notion table search 接口。
    + 指定 notion 表格和关键字，检索记录。
+ 基于上述接口实现了文章搜索功能。
    + 部署在 netlify 上既可以使用 文章搜索功能。
+ 基于上述接口实现了绘画模块（beta）。
[ ] 计划将所有的动态接口全部用 netlify lambda function 重写。 届时不再需要部署后端，即可使用所有功能。

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
