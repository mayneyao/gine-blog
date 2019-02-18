const axios = require('axios')
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
    console.log(pageId)
    let res = await axios.post('https://www.notion.so/api/v3/loadPageChunk',
        { "pageId": getFullBlockId(pageId), "limit": 50, "cursor": { "stack": [] }, "chunkNumber": 0, "verticalColumns": false },
        {
            header: { 'content-type': 'application/json;charset=UTF-8' }
        })
    let collectionId = Object.entries(res.data.recordMap.collection)[0][0]
    return collectionId
}
queryCollection = async (url) => {
    let [base, params] = url.split('?')
    let p = new URLSearchParams(params)
    baseUrlList = base.split('/')
    let collectionId = await getPageCollectionId(baseUrlList[baseUrlList.length - 1])
    console.log(collectionId)
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
            let newKey = schema[key].name
            parsedBlockData[newKey] = val[0][0]
        })
        data.push(parsedBlockData)
    })
    console.log(data)
    return data
}

// console.log(queryCollection('https://www.notion.so/0e59694e75ee4357963695d6195ceeb3?v=52e8f7f022f240d8899ae26b83458ee6'))

module.exports = { queryCollection }
