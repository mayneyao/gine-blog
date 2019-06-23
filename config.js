
// 

module.exports = {
    // blog mate
    blogMeta: {
        title: `Mayne's Blog`, //网站标题
        pageSize: 3, // 每页多少篇文章
        description: `All things about Mayne`, // 网站描述 seo
        siteUrl: `https://gine.me`, // 站点URL
        aboutPostSlug: `10a70927d25a43d19acf14e0d36354e7`, //没有单独的about页面，about页面指向文章。
    },

    // 博客数据源 目前只适配notion
    blog: {
        sourceType: 'notion',
        url: 'https://www.notion.so/gine/b8081728310b49fea0ff1d14e190b3fb?v=dbd9df2e8f784aa7bf8db977d82ee635',

        // 建议开启，可以大大提高build速度
        // 访问 https://github.com/settings/tokens 获取token 
        // export GitHubToken='yourtokenhere'
        openGithubCache: true, // 开启此配置后，notion页面的数据会缓存到github仓库。需要在环境变量中配置 GitHubToken
        github: {
            username: 'mayneyao', // github 用户名
            repo: 'blog', // 作为blog缓存数据仓库的名称
            branch: 'master' // 作为blog缓存数据仓库的分支
        },
        search: {
            open: true, // 是否开启文章搜索功能
            api: "/.netlify/functions/search" // 搜索接口
            // api: "http://127.0.0.1:9000/search" // 搜索接口

        }
    },

    // 友链
    friendLink: {
        sourceType: 'notion',
        url: 'https://www.notion.so/gine/0e59694e75ee4357963695d6195ceeb3?v=52e8f7f022f240d8899ae26b83458ee6', // 从notion表格读取数据

    },

    // 下面的是可选组件
    // 评论
    comment: {
        open: true, //默认关闭，仅适配disqus
        sourceType: 'disqus',
        disqus: {
            disqusShortname: 'maynes-blog' // 你的短域名
        }
    },

    // 番剧
    bangumi: {
        open: true, // 默认关闭
        sourceType: 'bilibili',
        url: 'http://space.bilibili.com/ajax/Bangumi/getList?mid=22539301', // 替换自己为自己的mid （这里只获取了第一页的数据，有需要的自行修改。）
    },

    // 格言
    aphorisms: {
        open: true, // 默认关闭 需要api
        sourceType: 'notion',
        url: 'https://www.notion.so/gine/b23848d867974c36a2902ec4cb833453?v=29915c889d4c415cbfb9e9bf7dd49afd',
        // 返回格式参见上面链接的内容
    },

    // 绘画
    draw: {
        open: true,
        url: 'https://www.notion.so/gine/306f676a9b93470f8f99baefbdbeea1c?v=674d6449a8354f7aba4e4c174d8608e6'
    },

    // 个人动态
    moments: {
        open: true,
        url: 'https://www.notion.so/gine/3f7ccea5c2054477aba91f8e6e79dceb?v=e0094e2a6bfb4180a386a2de5237e609'
    },

    // 正在播放的音乐
    // 正在玩的游戏
    now: {
        open: true, // 默认关闭。需要接口
    },

    book: {
        open: true, // 默认关闭
        url: 'https://www.notion.so/98717bf8ad57434eafd9a65277403c33?v=fa4f00bb9b5b492fb23157f8d5df471f', // 目前仅仅是外链
    },

    // music 
    music: {
        open: true, // 默认关闭。需要个人 spotify api
        url: 'https://api.gine.me' // 数据格式可参考此链接内容
    },

    // game
    game: {
        open: true, // 默认关闭。需要个人 steam api
    },

    // seo 
    seo: {
        open: true, // 如果部署在netlify上，为了更好的seo，请开启此选项
        siteUrl: 'https://gine.me', // 站点url
        netlifyUrl: 'https://gine.netlify.com' //netlify分配的url
    },

    // sitemap
    sitemap: {
        open: true, // 默认关闭，站点地图 seo友好
    },
    // Google Analytics
    ga: {
        open: true, // 默认关闭
        trackingId: 'UA-89592481-3', // ga 分配的追踪代码
        // viewId: '187855292', // ga 分配的数据视图ID，用于 guess.js 优化访问体验。
    },

    // google_ad_client
    google_ad_client: {
        open: true,
        clientId: 'pub-6897108038029263',
    },
    // PWA 优化 
    pwa: {
        open: true, //默认关闭

        // 配置参见 gatsby-plugin-manifest 插件文档
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
        open: true, //默认关闭
        // 配置参见 gatsby-plugin-feed 插件文档
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