
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
        {
            resolve: `gatsby-source-notion-database`,
            options: {
                dbMap: {
                    "posts": "https://www.notion.so/99623ef9630940cdb8524ba355831677?v=8366741ca7dd4b339c19484712e13563",
                    "links": "https://www.notion.so/71d6656af07e418a92b3fe966a4ba087?v=1329463e9dfe45899caf28d317b84d50",
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


module.exports = conf