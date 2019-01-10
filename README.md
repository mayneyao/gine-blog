# Gatsby example

gatsby react material-ui
## TODO

+ 列表页
    + 分页组件
+ 文章页
    + 头图
    + tags
    + 评论
+ 底部
+ 全部标页
+ 标签详情页

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/gatsby
cd gatsby
```

Install it and run:

```sh
npm install
npm run develop
```

## The idea behind the example

[Gatsby](https://github.com/gatsbyjs/gatsby) is a static site generator for React.

## `withRoot` usage

We are using the `withRoot` higher-order component to accommodate Material-UI's styling solution with Gatsby.

⚠️ You should only use a single `withRoot` for rendering one page.
