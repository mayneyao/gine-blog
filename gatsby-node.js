const {createFilePath} = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath: `pages`})
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = ({graphql, actions}) => {
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const {createPage} = actions
    return graphql(`
    {
      site{
        siteMetadata {
          pageSize
        }
      }
      allMarkdownRemark {
        totalCount
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `,
    ).then(result => {
        const {totalCount, edges} = result.data.allMarkdownRemark

        const {pageSize} = result.data.site.siteMetadata
        // 创建分页
        const pageCount = Math.ceil(totalCount / pageSize)
        for (let i = 1; i <= pageCount; i++) {
            createPage({
                path: `page/${i}`,
                component: path.resolve(`./src/components/post-page.js`),
                context: {
                    skip: (i - 1) * pageSize,
                    limit: pageSize,
                },
            })
        }

        // 创建文章详情页
        edges.forEach(({node}) => {
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
    })
}
