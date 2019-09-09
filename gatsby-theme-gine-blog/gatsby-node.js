const fs = require("fs")
const config = require('./config')

// exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
//     const { createNode } = actions;
// }


// exports.onCreateNode = ({ node, getNode, actions }) => {
//     const { createNodeField } = actions
// }

exports.createPages = ({ graphql, actions }) => {

    // google adsense 校验
    if (config.google_ad_client.open) {
        const ad_txt = `google.com, ${config.google_ad_client.clientId}, DIRECT, f08c47fec0942fa0`
        fs.writeFile('public/ads.txt', ad_txt, function (err) {
            if (err) {
                console.error(err)
            }
        })
    }
    // netlify 域名重定向
    if (config.seo.open) {
        // 如果站点是部署在 netlify上，开启此选项可以优化seo结果
        const _redirects = `${config.seo.netlifyUrl}/* ${config.seo.siteUrl}/:splat 301!`
        fs.writeFile('public/_redirects', _redirects, function (err) {
            if (err) {
                console.error(err)
            }
        })
    }

    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const { createPage } = actions

    return graphql(`
    {
      site{
        siteMetadata {
          pageSize
        }
      }
      allPosts {
        totalCount
        edges {
          node {
              id
              slug
              tags
          }
        }
      }
    }`).then(result => {

        const { pageSize } = result.data.site.siteMetadata

        // 创建主页
        createPage({
            path: `/`,
            component: require.resolve(`./src/components/post/post-page.js`),
            context: {
                skip: 0,
                limit: pageSize,
                currentPage: 1,
            },
        })

        // 创建分页
        const { totalCount, edges } = result.data.allPosts
        const pageCount = Math.ceil(totalCount / pageSize)
        for (let i = 1; i <= pageCount; i++) {
            createPage({
                path: `page/${i}`,
                component: require.resolve(`./src/components/post/post-page.js`),
                context: {
                    skip: (i - 1) * pageSize,
                    limit: pageSize,
                    currentPage: i,
                },
            })
        }

        // 创建文章详情页
        edges.forEach(({ node }) => {
            createPage({
                path: `posts/${node.slug}`,
                component: require.resolve(`./src/components/post/blog-post.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.slug,
                },
            })
        })
        // 创建tag详情页
        let allTags = new Set()
        edges.forEach(({ node }) => {
            node.tags.map(tag => allTags.add(tag))
        })

        Array.from(allTags).map(tag => {
            createPage({
                path: `tags/${tag}`,
                component: require.resolve(`./src/components/postTag/tag-page.js`),
                context: {
                    tag: tag,
                },
            })
        })
    })
}


// fix antv build error
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /@antv/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
}