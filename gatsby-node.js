const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require("fs")
const axios = require('axios')
const download = require('image-downloader')
const notion = require('./src/notion/syncBlog')
const notionApi = require('./src/notion/api')
const config = require('./config')

function genApiData(data, type, key, createNode, createNodeId, createContentDigest) {
    data.map(itemData => {
        const nodeContent = JSON.stringify(itemData)
        const nodeMeta = {
            id: createNodeId(itemData[key]),
            parent: null,
            children: [],
            internal: {
                type,
                mediaType: `text/html`,
                content: nodeContent,
                contentDigest: createContentDigest(itemData)
            }
        }
        const node = Object.assign({}, itemData, nodeMeta)
        createNode(node)
    })
}

async function genBangumiData(createNode, createNodeId, createContentDigest) {
    let res
    console.log('>>>获取bangumi数据')

    if (config.bangumi.open) {
        res = await axios.get(config.bangumi.url)
    } else {
        // 站位数据，没有实际意义，为了保证build通过
        res = {
            data: {
                data: {
                    result: [
                        {
                            brief: "史莱姆生活，开始了。↵上班族的三上悟在道路上被歹徒给刺杀身亡后，回过神来发现自己转生到了异世界。↵不...",
                            cover: "http://i0.hdslb.com/bfs/bangumi/a4c0e0ccc44fe3949a734f546cf5bb07da925bad.png",
                            evaluate: "",
                            favorites: 4396396,
                            is_finish: 0,
                            last_ep_index: 0,
                            newest_ep_index: 21,
                            season_id: "25739",
                            share_url: "http://bangumi.bilibili.com/anime/25739/",
                            title: "关于我转生变成史莱姆这档事",
                            total_count: 0,
                        }
                    ]
                }
            }
        }
    }

    res.data.data.result.map(myData => {
        // Data can come from anywhere, but for now create it manually
        let coverUrl = myData.cover
        let coverPath = `public/static/${coverUrl.split('/').pop()}`
        let options = {
            url: coverUrl,
            dest: coverPath
        }
        if (!fs.existsSync(coverPath)) {
            download.image(options)
                .then(({ filename, image }) => {
                    console.log('File saved to', filename)
                })
                .catch((err) => {
                    console.error(err)
                })
        }

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
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions;

    // 生成友链数据
    let linkData
    if (config.friendLink.sourceType === 'notion') {
        linkData = await notionApi.queryCollection(config.friendLink.url)
    } else {
        // 如果你的友链数据不是通过 notion表格获取的,你可以在这里直接定义，或者从其他地方获取。数据格式如下
        linkData = [
            {
                desc: "Mayne's Blog",
                icon: "https://gine.me/icons/icon-48x48.png",
                url: "https://gine.me",
                name: "Mayne"
            },
        ]
    }
    genApiData(linkData, 'Link', 'name', createNode, createNodeId, createContentDigest)

    // 生成番剧数据。不管是不是开启，都需要有bangumi数据，否则编译会报错    
    await genBangumiData(createNode, createNodeId, createContentDigest);

    // 生成blog post数据
    await notion.syncNotionBlogData({ createNode, createNodeId, createContentDigest });

    // 生成书单数据
    await notion.syncNotionBookData({ createNode, createNodeId, createContentDigest });
}


exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
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
      allPost {
        totalCount
        edges {
          node {
              slug
              tags
          }
        }
      }
    }`).then(result => {
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

        // 创建分页
        const { totalCount, edges } = result.data.allPost
        const { pageSize } = result.data.site.siteMetadata
        const pageCount = Math.ceil(totalCount / pageSize)
        for (let i = 1; i <= pageCount; i++) {
            createPage({
                path: `page/${i}`,
                component: path.resolve(`./src/components/post/post-page.js`),
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
                path: node.slug,
                component: path.resolve(`./src/components/post/blog-post.js`),
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
                component: path.resolve(`./src/components/postTag/tag-page.js`),
                context: {
                    tag: tag,
                },
            })
        })
        // music
        if (config.music.open) {
            createPage({
                path: `music`,
                component: path.resolve(`./src/components/music/top.js`),
                context: {},
            })
        }
        // bangumi
        if (config.bangumi.open) {
            createPage({
                path: `bangumi`,
                component: path.resolve(`./src/components/bangumi/index.js`),
                context: {},
            })
        }
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