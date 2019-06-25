const axios = require('axios')
const config = require('../../../config')
const fs = require("fs")
const download = require('image-downloader')

getBangumiData = async () => {
    let allBangumiData = []
    let res = await axios.get(config.bangumi.url)
    let count = 1
    allBangumiData = allBangumiData.concat(res.data.data.result)
    while (count <= res.data.data.pages) {
        count += 1
        res = await axios.get(`${config.bangumi.url}&page=${count}`)
        data = res.data
        allBangumiData = allBangumiData.concat(res.data.data.result)
    }
    return allBangumiData
}


async function genBangumiData(createNode, createNodeId, createContentDigest) {
    if (config.bangumi.open) {
        console.log('>>>获取bangumi数据')
        res = await getBangumiData()
    } else {
        // 站位数据，没有实际意义，为了保证build通过
        res = [
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

    res.map(myData => {
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

t = async () => {
    let r = await getBangumiData()
    console.log(r, r.length)
}

// t()

module.exports = { getBangumiData, genBangumiData }