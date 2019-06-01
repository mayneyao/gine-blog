const puppeteer = require('puppeteer');
const Axios = require('axios');
const GitHub = require('../github/api');
const dayjs = require('dayjs');
const config = require('../../config');
const notion = require('./api');

syncBlogData = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#notion-app');
    await page.waitFor(8000);
    const data = await page.evaluate(() => {
        // 图片链接转换
        document.querySelectorAll('div.notion-page-content  img').forEach(item => {
            if (item.src.startsWith("https://s3.us-west")) {
                let [parsedOriginUrl] = item.src.split("?")
                item.src = `https://notion.so/image/${encodeURIComponent(parsedOriginUrl).replace("s3.us-west", "s3-us-west")}`
            } else {
                item.src = item.src
            }
        })

        // TOC 链接转化
        let qs = "#notion-app > div > div.notion-cursor-listener > div > div.notion-scroller.vertical.horizontal > div.notion-page-content > div > div:nth-child(1) > div > a"
        document.querySelectorAll(qs).forEach(item => {
            // 真是服了，puppeteer传个函数这么麻烦。🤯
            const getFullBlockId = (blockId) => {
                if (typeof blockId !== 'string') {
                    throw Error(`blockId: ${typeof blockId} must be string`)
                }
                if (blockId.match("^[a-zA-Z0-9]+$")) {
                    return blockId.substr(0, 8) + "-"
                        + blockId.substr(8, 4) + "-"
                        + blockId.substr(12, 4) + "-"
                        + blockId.substr(16, 4) + "-"
                        + blockId.substr(20, 32)
                } else {
                    return blockId
                }
            }
            let hashBlockID = getFullBlockId(item.hash.slice(1))
            console.log(hashBlockID)
            item.href = `#${hashBlockID}`

            let block = document.querySelector(`div[data-block-id="${hashBlockID}"]`)
            if (block){
                block.id = hashBlockID
            }
        });

        // 文章内容
        let content = document.querySelector('#notion-app > div > div.notion-cursor-listener > div > div > div.notion-page-content')

        if (content) {
            return {
                html: content.innerHTML,
                brief: content.innerText.slice(0, 100)
            }
        }
        else {
            return false
        }
    })

    await browser.close();
    return data
}

uploadBlogData2Github = async (item, blogData) => {
    let blogKey = `${item.slug}.json`
    let now = dayjs()

    let d = {
        'update_time': now.toISOString(),
        'content': blogData
    }
    let res = await GitHub.updateOrCreate(blogKey, JSON.stringify(d))
    if (res) {
        console.log(`>>>${item.name} 更新到github成功`)
    } else {
        console.log(`>>>${item.name} 更新到github失败`)
    }
}


exports.syncNotionBlogData = async ({ createNode, createNodeId, createContentDigest }) => {

    if (config.blog.sourceType === 'notion') {
        let url = config.blog.url
        let res = await notion.queryCollection(url)

        res = res.filter(item => item.status == '已发布')
        if (config.blog.openGithubCache) {
            // 开启github 文章缓存
            let allBlogInfo = await GitHub.getAllBlogInfo()

            for (let item of res) {
                let blogData
                let blogKey = `${item.slug}.json`
                let blogSha = allBlogInfo[blogKey]
                let isFromGithubCache = true
                if (blogSha) {
                    // 存在旧blog数据
                    let githubBlogData = await GitHub.getBlogData(blogSha)
                    if (dayjs(item.last_edited_time) > dayjs(githubBlogData.update_time)) {
                        // 文章需要更新
                        console.log(`>>>开始同步文章:${item.name} from notion \n`)
                        blogData = await syncBlogData(item.browseableUrl);
                        isFromGithubCache = false
                        await uploadBlogData2Github(item, blogData)

                    } else {
                        // 文章不需要更新，获取来自github的缓存数据
                        blogData = githubBlogData.content
                    }

                } else {
                    // 不存在blog 数据
                    console.log(`>>>开始同步文章:${item.name} from notion \n`)
                    blogData = await syncBlogData(item.browseableUrl);
                    isFromGithubCache = false
                    await uploadBlogData2Github(item, blogData)
                }
                if (blogData) {
                    if (isFromGithubCache) {
                        console.log(`>>>从github获取缓存Blog数据: ${item.name}`)
                    }
                    let data = { ...item, update_time: item.last_edited_time, slug: `posts/${item.slug}`, html: blogData.html, brief: blogData.brief }
                    const nodeContent = JSON.stringify(data)
                    const nodeMeta = {
                        id: createNodeId(data.slug),
                        parent: null,
                        children: [],
                        internal: {
                            type: `Post`,
                            mediaType: `text/html`,
                            content: nodeContent,
                            contentDigest: createContentDigest(data)
                        }
                    }
                    const node = Object.assign({}, data, nodeMeta)
                    createNode(node)
                }
            }
        } else {
            // 未开启github文章缓存，每次都从notion拉取文章
            for (let item of res) {
                console.log(`>>>开始同步文章:${item.name} from notion \n`)
                const blogData = await syncBlogData(item.browseableUrl);
                if (blogData) {
                    let data = { ...item, update_time: item.last_edited_time, slug: `posts/${item.slug}`, html: blogData.html, brief: blogData.brief }
                    const nodeContent = JSON.stringify(data)
                    const nodeMeta = {
                        id: createNodeId(data.slug),
                        parent: null,
                        children: [],
                        internal: {
                            type: `Post`,
                            mediaType: `text/html`,
                            content: nodeContent,
                            contentDigest: createContentDigest(data)
                        }
                    }
                    const node = Object.assign({}, data, nodeMeta)
                    createNode(node)
                }
            }

        }

    }
}

exports.syncNotionBookData = async ({ createNode, createNodeId, createContentDigest }) => {
    let url = 'https://www.notion.so/98717bf8ad57434eafd9a65277403c33?v=fa4f00bb9b5b492fb23157f8d5df471f'
    let res = await notion.queryCollection(url)

    for (let data of res) {
        const nodeContent = JSON.stringify(data)
        const nodeMeta = {
            id: createNodeId(data.slug),
            parent: null,
            children: [],
            internal: {
                type: `Book`,
                mediaType: `text/html`,
                content: nodeContent,
                contentDigest: createContentDigest(data)
            }
        }
        const node = Object.assign({}, data, nodeMeta)
        createNode(node)
    }
}