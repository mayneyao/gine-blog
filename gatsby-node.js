const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require("fs");

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = ({ graphql, actions }) => {
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
      allAphorismsCsv {
        edges {
          node {
            content
            person
            source
          }
        }
      }
      allMarkdownRemark {
        totalCount
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `,
    ).then(result => {
        // netlify 域名重定向
        const _redirects = 'https://gine.netlify.com/* https://gine.me/:splat 301!'

        fs.writeFile('public/_redirects', _redirects, function (err) {
            if (err) {
                console.error(err)
            }
        })

        // 创建格言json
        const aphorismsData = JSON.stringify(result.data.allAphorismsCsv)
        fs.writeFile('public/aphorisms.json', aphorismsData, function (err) {
            if (err) {
                console.error(err)
            }
        })


        // 创建分页
        const { totalCount, edges } = result.data.allMarkdownRemark
        const { pageSize } = result.data.site.siteMetadata
        const pageCount = Math.ceil(totalCount / pageSize)
        for (let i = 1; i <= pageCount; i++) {
            createPage({
                path: `page/${i}`,
                component: path.resolve(`./src/components/post-page.js`),
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
                path: `posts${node.fields.slug}`,
                component: path.resolve(`./src/components/blog-post.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.fields.slug,
                },
            })
        })
        // 创建tag详情页
        let allTags = new Set()
        edges.forEach(({ node }) => {
            node.frontmatter.tags.map(tag => allTags.add(tag))
        })

        Array.from(allTags).map(tag => {
            createPage({
                path: `tags/${tag}`,
                component: path.resolve(`./src/components/tag-page.js`),
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