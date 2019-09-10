# gine-blog [WIP]



## Quik Start

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/mayneyao/gatsby-starter-gine-blog" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>


You will get a free site, a repository called `gatsby-starter-gine-blog` will be created (by netlify) under your github account. Just modify two lines in gatsby-config.js to complete the configuration.

Clone [this page](https://www.notion.so/share-blog-table-60e00520137944a4a45a437c7d089488) into your own notion. There are some tables in the page, there are 2 configuration tables. One is the site configuration and the other is the data source configuration. Replace the url of the configuration table in gatsby-config.js with your own.


+ SiteConfig - UI -  `gatsby-theme-gine-blog`     
+ SourceConfig - Data -  `gatsby-source-notion-database` 
    

## Develop & Run


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

```
module.exports = {
    plugins: [
        {
            resolve: `gatsby-theme-gine-blog`,
            options: {
                configTable: "https://www.notion.so/b4af861710064848aaf9f859c79bb127?v=0de244d6f8414ade9b7b147adcb2f78e", // change this url to yourself
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

if you dont want to config from notion table, write config file like this

```
module.exports = {
    plugins: [
        {
            resolve: `gatsby-theme-gine-blog`,
            options: {
                title: "your site title",
                ...otherConfig // find in SiteConfig table
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