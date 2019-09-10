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

change `configTable` for your own

+ site config - UI -  `gatsby-theme-gine-blog` 
    
+ source config - Data -  `gatsby-source-notion-database` 
    

```
module.exports = {
    plugins: [
        {
            resolve: `gatsby-theme-gine-blog`,
            options: {
                configTable: "https://www.notion.so/b4af861710064848aaf9f859c79bb127?v=0de244d6f8414ade9b7b147adcb2f78e", 
            }
        },
        {
            resolve: `gatsby-source-notion-database`,
            options: {
                configTable: "https://www.notion.so/65b35da1762e4f259904bb4cc38e54fd?v=89e80623e52e4419a35f20e54056cfb8", 
            }
        }
    ],
}
```

if you dont want to config source from notion table, write config file like this

```
module.exports = {
    plugins: [
        {
            resolve: `gatsby-theme-gine-blog`,
            options: {
                title: "your site title"
            }
        },
        {
            resolve: `gatsby-source-notion-database`,
            options: {
                dbMap: {
                    "posts": "https://www.notion.so/99623ef9630940cdb8524ba355831677?v=8366741ca7dd4b339c19484712e13563",
                    "links": "https://www.notion.so/0e59694e75ee4357963695d6195ceeb3?v=52e8f7f022f240d8899ae26b83458ee6",
                    "books": "https://www.notion.so/e355d54c576c41ea826c4704fde3a7c0?v=3f7d51a5dba040ff9ba02c4b99b07823",
                },
                settings: {
                    "posts": "html" // html content of title page will be cached
                }
            }
        }
    ],
}
```