const puppeteer = require('puppeteer');
const Axios = require('axios');
const GitHub = require('../github/api');
const dayjs = require('dayjs');


syncBlogData = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#notion-app');
    await page.waitFor(8000);
    const data = await page.evaluate(() => {
        document.querySelectorAll('div.notion-page-content  img').forEach(item => item.src = item.src)
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
    });

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
        console.log(`${item.name} 更新到github成功`)
    } else {
        console.log(`${item.name} 更新到github失败`)
    }
}

exports.syncNotionBlogData = async ({ createNode, createNodeId, createContentDigest }) => {
    let apiUrl = 'https://api.gine.me/notion/blog'
    let res = await Axios.get(apiUrl)

    let allBlogInfo = await GitHub.getAllBlogInfo()

    for (let item of res.data) {
        let blogData
        let blogKey = `${item.slug}.json`
        let blogSha = allBlogInfo[blogKey]
        let isFromGithubCache = true
        if (blogSha) {
            // 存在旧blog数据
            let githubBlogData = await GitHub.getBlogData(blogSha)
            if (dayjs(`${item.update_time}Z`) > dayjs(githubBlogData.update_time)) {
                // 文章需要更新
                console.log(`开始同步文章:${item.name} from notion \n`)
                blogData = await syncBlogData(item.url);
                isFromGithubCache = false
                await uploadBlogData2Github(item, blogData)

            } else {
                // 文章不需要更新，获取来自github的缓存数据
                blogData = githubBlogData.content
            }

        } else {
            // 不存在blog 数据
            console.log(`开始同步文章:${item.name} from notion \n`)
            blogData = await syncBlogData(item.url);
            isFromGithubCache = false
            await uploadBlogData2Github(item, blogData)
        }

        if (blogData) {
            if (isFromGithubCache) {
                console.log(`从github获取缓存Blog数据: ${item.name}`)
            }
            let data = { ...item, slug: `posts/${item.slug}`, html: blogData.html, brief: blogData.brief }
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