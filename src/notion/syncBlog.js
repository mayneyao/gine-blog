const puppeteer = require('puppeteer');
const Axios = require('axios');

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


exports.syncNotionBlogData = async ({ createNode, createNodeId, createContentDigest }) => {
    let apiUrl = 'https://api.gine.me/notion/blog'
    let res = await Axios.get(apiUrl)
    for (let item of res.data) {
        let blogData = await syncBlogData(item.url);
        console.log(`开始同步文章:${item.name}\n`)
        if (blogData) {
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