const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require("fs")
const axios = require('axios')
const download = require('image-downloader')


exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions
    return (axios.get('http://space.bilibili.com/ajax/Bangumi/getList?mid=22539301&page=1').then(res => {
        res.data.data.result.map(myData => {
            // Data can come from anywhere, but for now create it manually
            let coverUrl = myData.cover
            let coverPath = `public/static/${coverUrl.split('/').pop()}`
            let options = {
                url: coverUrl,
                dest: coverPath
            }

            download.image(options)
                .then(({ filename, image }) => {
                    console.log('File saved to', filename)
                })
                .catch((err) => {
                    console.error(err)
                })

            const nodeContent = JSON.stringify(myData)

            const nodeMeta = {
                id: createNodeId(myData.season_id),
                parent: null,
                children: [],
                internal: {
                    type: `Bangumi`,
                    mediaType: `text/html`,
                    content: nodeContent,
                    contentDigest: createContentDigest(myData)
                }
            }

            const node = Object.assign({}, myData, nodeMeta)
            createNode(node)
        })
    }))
}


exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Bangumi`) {
        console.log(node)
    }
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
                path: node.fields.slug,
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
        // music 
        createPage({
            path: `music`,
            component: path.resolve(`./src/components/music/top.js`),
            context: {},
        })

        // bangumi
        createPage({
            path: `bangumi`,
            component: path.resolve(`./src/components/bangumi/all.js`),
            context: {},
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