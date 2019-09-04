# gine-blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/c9191dcb-f9c1-4b8c-8ec7-fbca94456c84/deploy-status)](https://app.netlify.com/sites/gine/deploys)

gine-blog 是一个以 Notion 为 blog 后端,基于 React,Gatsby,Material-UI 开发的静态博客应用。如果博客部署在 netlify 上则可享受 netlify functions 免费额度，结合 Notion API 生成自定义的动态内容页。

screenshot
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F56495b11-eb1f-43b2-bef9-9a84c9822251%2Fs3.png?width=3840)


![给我也整一个](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4ba891b7-e685-40fa-89ee-0b8dd206b8a9%2Fnse-1761695606568594205-852524620.jpg?width=150)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/mayneyao/gine-blog" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>


## 关于新功能&分支&计划

+ 我会在 dev-mayne 分支(https://gine.me 部署的分支)上尝试新功能，待功能稳定后并入 master 分支。
+ 计划将 notion 相关的内容，用 notabase 封装，写成 gatsby 插件形式。减少博客仓库的代码。
+ 待上述特性稳定后，可能会考虑推出主题模块，主题代码与主仓库分离。

## 使用文档

https://gine.me/posts/a788c3e6713e4166a4a8c72a7977b457

## 更新日志

参见 [Releases](https://github.com/mayneyao/gine-blog/releases)

## FAQ

+ 托管在 Netlify 上的站点访问很慢怎么办？
  + Netlify 的 CDN 对国内用户并不友好，你可以将域名 DNS 设置为 Cloudflare，cf 的 cdn 勉强够用。（域名备案了的话，可以考虑国内的托管服务）


