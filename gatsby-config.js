
const config = require('./config.js')


conf = {
    siteMetadata: config.blogMeta,
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: "gatsby-plugin-netlify-cache",
            options: {
                cachePublic: true
            }
        },
    ],
}

if (config.ga.open) {
    conf.plugins.push({
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            trackingId: config.ga.trackingId,
            head: true,
        },
    })

    if (config.ga.viewId) {
        conf.plugins.push({
            resolve: "gatsby-plugin-guess-js",
            options: {
                // Find the view id in the GA admin in a section labeled "views"
                GAViewID: `${config.ga.viewId}`,
                minimumThreshold: 0.03,
                // The "period" for fetching analytic data.
                period: {
                    startDate: new Date("2019-1-1"),
                    endDate: new Date(),
                },
            },
        })
    }
}

if (config.sitemap.open) {
    conf.plugins.push({
        resolve: `gatsby-plugin-sitemap`,
        options: {
            output: `/sitemap.xml`,
            exclude: [],
            query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
    
              allSitePage {
                edges {
                  node {
                    path
                  }
                }
              }
          }`,
        },
    })
}

if (config.pwa.open) {

    // 安装应用
    conf.plugins.push({
        resolve: `gatsby-plugin-manifest`,
        options: config.pwa.conf,
    })

    // sw 重载
    let swConf = config.pwa.swConf

    // 对基于 nelify functions 动态页面，缓存其请求
    swConf.runtimeCaching.push({
        // Add runtime caching of various other page resources
        urlPattern: /^https?:.*\/.netlify\/functions\/notion/,
        handler: `staleWhileRevalidate`,
    })

    conf.plugins.push({
        resolve: `gatsby-plugin-offline`,
        options: swConf,
    })
}

if (config.rss.open) {
    conf.plugins.push({
        resolve: `gatsby-plugin-feed`,
        options: config.rss.conf
    })
}


if (config.blog.openGithubCache && !process.env.GitHubToken) {
    throw Error('因为您开启了github仓库缓存notion文章，请配置环境变量 GitHubToken')
}

module.exports = conf