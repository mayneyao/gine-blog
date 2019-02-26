
const config = require('./config.js').config

conf = {
    siteMetadata: config.blogMeta,
    plugins: [
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
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
    conf.plugins.push({
        resolve: `gatsby-plugin-manifest`,
        options: config.pwa.conf,
    })
}

if (config.rss.open) {
    conf.plugins.push({
        resolve: `gatsby-plugin-feed`,
        options: config.rss.conf
    })
}


if (config.blog.openGithubCache &&  !process.env.GitHubToken){
    throw Error('因为您开启了github仓库缓存notion文章，请配置环境变量 GitHubToken')
}

module.exports = conf