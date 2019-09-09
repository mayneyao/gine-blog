# gine-blog [WIP]



## Get Started


1. install gatsby-cli

```
yarn global add gatsby-cli
```

2. get starter code 

```
gatsby new my-gine-blog https://github.com/mayneyao/gatsby-starter-gine-blog.git

```
3. run 

```
yarn develop
```

## Config

copy [this page](https://www.notion.so/share-blog-table-60e00520137944a4a45a437c7d089488) to your own notion's workspace

the only file you need care is `gatsby-config.js`

change `dbMap` for your own table url
```
module.exports = {
    plugins: [
        {
            resolve: `gatsby-theme-gine-blog`
        },
        {
            resolve: `gatsby-source-notion-database`,
            options: {
                dbMap: {
                    "posts": "https://www.notion.so/99623ef9630940cdb8524ba355831677?v=8366741ca7dd4b339c19484712e13563",
                    "links": "https://www.notion.so/0e59694e75ee4357963695d6195ceeb3?v=52e8f7f022f240d8899ae26b83458ee6",
                    "books": "https://www.notion.so/e355d54c576c41ea826c4704fde3a7c0?v=3f7d51a5dba040ff9ba02c4b99b07823",
                    "aphorisms": "https://www.notion.so/a841201f775e40f7ba931e09520e9da1?v=0ff0a013989e4ce1a475bacd46867726",
                    "moments": "https://www.notion.so/735993abd6614abb8b37079f8e08d720?v=dcf03ba9b5694ffda0e5d8ded199b5ea"
                },
                settings: {
                    "posts": "html" // posts 中的 title 对应页面的 html 会被缓存
                }
            }
        }
    ],
}
```
