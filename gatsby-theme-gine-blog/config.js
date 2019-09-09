
// 

module.exports = {
    // blog mate
    blogMeta: {
        name: 'Mayne', // copyright 显示
        title: `Mayne's Blog`, //网站标题
        pageSize: 3, // 每页多少篇文章
        description: `All things about Mayne`, // 网站描述 seo
        siteUrl: `https://gine.me`, // 站点URL
        aboutPostSlug: `10a70927d25a43d19acf14e0d36354e7`, //没有单独的about页面，about页面指向文章。
        avatar: '41546411364_.pic.jpg', // src/static 目录下
        // 社交帐号配置，显示在页面最下方。
        me: {
            github: 'mayneyao' // github 用户名称
        }
    },


    // 下面的是可选组件
    // 评论
    comment: {
        open: false, //默认关闭，仅适配disqus
        sourceType: 'disqus',
        disqus: {
            disqusShortname: 'maynes-blog' // 你的短域名
        }
    },


    // seo 
    seo: {
        open: false, // 如果部署在netlify上，为了更好的seo，请开启此选项
        siteUrl: 'https://gine.me', // 站点url
        netlifyUrl: 'https://gine.netlify.com' //netlify分配的url
    },

    // sitemap
    sitemap: {
        open: false, // 默认关闭，站点地图 seo友好
    },
    // Google Analytics
    ga: {
        open: false, // 默认关闭
        trackingId: 'UA-xxxxxxxx-x', // ga 分配的追踪代码
    },
    // google_ad_client
    google_ad_client: {
        open: false,
        clientId: 'pub-xxxxxxxxxxxx',
    },
    // PWA 优化 
    pwa: {
        open: false, //默认关闭

        // 配置参见 gatsby-plugin-manifest 插件文档
        conf: {
            name: `Mayne's Blog`,
            short_name: `Mayne's Blog`,
            start_url: `/`,
            background_color: `#ffffff`,
            theme_color: `#ffffff`,
            display: `standalone`,
            icon: `src/static/41546411364_.pic.jpg`, // This path is relative to the root of the site.
        },
        // 配置参见 gatsby-plugin-offline 插件文档
        swConf: {
            runtimeCaching: [
                {
                    // Use cacheFirst since these don't need to be revalidated (same RegExp
                    // and same reason as above)
                    urlPattern: /(\.js$|\.css$|static\/)/,
                    handler: `cacheFirst`,
                },
                {
                    // Add runtime caching of various other page resources
                    urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
                    handler: `staleWhileRevalidate`,
                },
                {
                    // Google Fonts CSS (doesn't end in .css so we need to specify it)
                    urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
                    handler: `staleWhileRevalidate`,
                },
            ],
        }
    },
}
