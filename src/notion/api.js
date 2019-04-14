const axios = require('axios')
const dayjs = require('dayjs')
const { URLSearchParams } = require('url')

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

                let newKey = r.name
                if (r.type === 'date') {
                    parsedBlockData[newKey] = val[0][1][0][1].start_date
                } else if (r.type === 'multi_select') {
                    parsedBlockData[newKey] = val[0][0].split(',')
                } else if (r.type == 'file') {
                    parsedBlockData[newKey] = val[0][1][0][1]
                } else {
                    parsedBlockData[newKey] = val[0][0]
                }
            }
        })
        data.push(parsedBlockData)
    })
    // console.log(data)
    return data
}


// console.log(queryCollection('https://www.notion.so/98717bf8ad57434eafd9a65277403c33?v=fa4f00bb9b5b492fb23157f8d5df471f'))

t = async () => {
    let res = await queryCollection('https://www.notion.so/98717bf8ad57434eafd9a65277403c33?v=fa4f00bb9b5b492fb23157f8d5df471f')
    console.log(res, res.length)
}

// t()
module.exports = { queryCollection }