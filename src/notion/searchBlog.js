const axios = require('axios')


exports.searchBlogs = async (url, query) => {
    let api_url = 'https://www.notion.so/api/v3/'
    let ret = await axios.post(api_url,
        {
            "query": query,
            "table": "block",
            "id": "b8081728-310b-49fe-a0ff-1d14e190b3fb", // fixme 这里写死了 我blog的 table id
            "limit": 20
        },
        {
            header: { 'content-type': 'application/json;charset=UTF-8' }
        }
    )
    return ret.data
}
