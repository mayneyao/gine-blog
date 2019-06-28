const axios = require('axios')
const dayjs = require('dayjs')
const { URLSearchParams } = require('url')
const parse = require('url').parse


const getUrlBloackId = (url) => {
    let pUrl = parse(url)
    let pathList = pUrl.pathname.split('/')
    let blockID = pathList[pathList.length - 1]
    return blockID
}

const getBlockHashId = (blockId) => {
    return blockId.split('-').join('')
}
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

getPageCollectionId = async (pageId) => {
    let res = await axios.post('https://www.notion.so/api/v3/loadPageChunk',
        { "pageId": getFullBlockId(pageId), "limit": 50, "cursor": { "stack": [] }, "chunkNumber": 0, "verticalColumns": false },
        {
            header: { 'content-type': 'application/json;charset=UTF-8' }
        })
    let collectionId = Object.entries(res.data.recordMap.collection)[0][0]
    return collectionId
}

getBrowseableUrl = (blockID) => {
    return `https://notion.so/${blockID.split('-').join('')}`
}

parseImageUrl = (url, width) => {
    let rUrl
    if (url.startsWith("https://s3")) {
        let [parsedOriginUrl] = url.split("?")
        rUrl = `https://notion.so/image/${encodeURIComponent(parsedOriginUrl).replace("s3.us-west", "s3-us-west")}`
    } else if (url.startsWith("/image")) {
        rUrl = `https://notion.so${url}`
    } else {
        rUrl = url
    }

    if (width) {
        return `${rUrl}?width=${width}`
    } else {
        return rUrl
    }
}

queryCollection = async (url) => {
    let [base, params] = url.split('?')
    let p = new URLSearchParams(params)
    baseUrlList = base.split('/')
    let collectionId = await getPageCollectionId(baseUrlList[baseUrlList.length - 1])
    // console.log(collectionId)
    let collectionViewId = getFullBlockId(p.get('v'))
    let res = await axios.post('https://www.notion.so/api/v3/queryCollection', {
        collectionId,
        collectionViewId,
        loader: { type: "table" }
    }, {
            header: { 'content-type': 'application/json;charset=UTF-8' }
        })
    let data = []
    const { blockIds } = res.data.result
    const { collection } = res.data.recordMap
    const { value: { schema } } = collection[collectionId]
    blockIds.map(blockId => {
        let blockData = res.data.recordMap.block[blockId].value
        let parsedBlockData = {}
        Object.entries(blockData.properties).map(item => {
            let [key, val] = item
            let r = schema[key]
            if (r) {
                parsedBlockData.slug = blockId.split('-').join('')
                parsedBlockData.browseableUrl = getBrowseableUrl(blockId)
                parsedBlockData.created_time = dayjs(blockData.created_time).toISOString()
                parsedBlockData.last_edited_time = dayjs(blockData.last_edited_time).toISOString()

                // page_cover
                if (blockData.format) {
                    parsedBlockData.pformat = blockData.format
                } else {
                    parsedBlockData.pformat = { page_cover: "" }
                }

                let newKey = r.name
                switch (r.type) {
                    case 'date':
                        parsedBlockData[newKey] = val[0][1][0][1].start_date
                        break
                    case 'multi_select':
                        parsedBlockData[newKey] = val[0][0].split(',')
                        break
                    case 'file':
                        parsedBlockData[newKey] = val.filter(item => {
                            let content = item[1]
                            return Boolean(content)
                        }).map(item => {
                            return item[1][0][1]
                        })
                        break
                    case 'relation':
                        parsedBlockData[newKey] = val.filter(item => item.length > 1).map(item => item[1][0])
                        break
                    default:
                        parsedBlockData[newKey] = val[0][0]
                        break
                }

            }
        })
        data.push(parsedBlockData)
    })
    // console.log(data)
    return data
}

const search = async (fullTableID, query) => {
    let apiUrl = 'https://www.notion.so/api/v3/searchBlocks'
    let ret = await axios.post(apiUrl,
        {
            "query": query,
            "table": "block",
            "id": fullTableID,
            "limit": 20
        },
        {
            header: {
                'content-type': 'application/json;charset=UTF-8',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
            }
        }
    )
    return ret.data
}

// t = async () => {
//     const { getUrlBloackId, getFullBlockId } = notion
//     let fullTableID = getFullBlockId(getUrlBloackId(config.blog.url))
//     let res = await searchBlogs(fullTableID, 'react')
//     console.log(res)
// }

// t()

// t = async () => {
//     let res = await queryCollection('https://www.notion.so/gine/98717bf8ad57434eafd9a65277403c33?v=e338aeb23c854f51bf52b37bfc3fb75a')
//     console.log(res, res.length)
// }

// t()
module.exports = { queryCollection, getFullBlockId, parseImageUrl, getUrlBloackId, search, getBlockHashId }