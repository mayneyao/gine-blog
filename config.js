
// 

exports.config = {
    // blog mate
    blogMeta: {
        title: `Mayne's Blog`,
        pageSize: 3,
        description: `All things about Mayne`,
        siteUrl: `https://gine.me`,
    },

    // 博客数据源 目前只适配notion
    blog: {
        sourceType: 'notion',
        url:'https://www.notion.so/b8081728310b49fea0ff1d14e190b3fb?v=dbd9df2e8f784aa7bf8db977d82ee635',
        openGithubCache: true, // 开启此配置后，notion页面的数据会缓存到github仓库。需要在环境变量中配置 GitHubToken
        github: {
            username: 'mayneyao',
            repo: 'blog',
            branch: 'master'
        }
    },
    // 下面的是可选组件
    // 番剧
    bangumi: {
        open: true,
        sourceType: 'bilibili',
        url: 'http://space.bilibili.com/ajax/Bangumi/getList?mid=22539301&page=1',
    },
    // 友链
    friendLink: {
        open: true,
        sourceType: 'notion',
        url: 'https://www.notion.so/0e59694e75ee4357963695d6195ceeb3?v=52e8f7f022f240d8899ae26b83458ee6',
    },
    // 格言
    aphorisms: {
        open: true,
        sourceType: 'api',
        url: 'https://api.gine.me/notion/b23848d867974c36a2902ec4cb833453/29915c889d4c415cbfb9e9bf7dd49afd?random_one=1',
    },

    // music 
    music: {
        open: true, // 默认关闭。需要个人 spotify api
    },

    // game
    game: {
        open: true, // 默认关闭。需要个人 steam api
    },

    // seo 
    seo: {
        open:true, // 如果部署在netlify上，为了更好的seo，请开启此选项
        siteUrl:'https://gine.me', // 站点url
        netlifyUrl:'https://gine.netlify.com' //netlify分配的url
    },
    
    // sitemap
    sitemap: {
        open: true,
    },
    // Google Analytics
    ga: {
        open: true,
        trackingId: 'UA-89592481-3',
    },
    // PWA 优化 
    pwa: {
        open: true,
        conf: {
            name: `Mayne's Blog`,
            short_name: `Mayne's Blog`,
            start_url: `/`,
            background_color: `#ffffff`,
            theme_color: `#ffffff`,
            display: `standalone`,
            icon: `src/static/41546411364_.pic.jpg`, // This path is relative to the root of the site.
        }
    },
    rss: {
        open: true,
        conf: {
            query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
            feeds: [
                {
                    serialize: ({ query: { site, allPost } }) => {
                        return allPost.edges.map(edge => {
                            return {
                                title: edge.node.name,
                                description: edge.node.brief,
                                date: edge.node.public_date,
                                url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                                guid: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                                custom_elements: [{ "content:encoded": edge.node.html }],
                            }
                        })
                    },
                    query: `
                    {
                      allPost(limit: 1000,sort: { order: DESC, fields: [public_date] },) {
                        edges {
                          node {
                            brief
                            html
                            slug 
                            name
                            public_date
                          }
                        }
                      }
                    }
                  `,
                    output: "/feed",
                    title: "GiNE RSS Feed",
                },
            ],
        },
    }
}