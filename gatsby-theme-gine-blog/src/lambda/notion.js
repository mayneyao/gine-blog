const axios = require('axios')
const token_v2 = undefined
const cookie = `token_v2=${token_v2}`
const AUTH_CODE = 'nobody knows but you'


exports.handler = async (event, context) => {
    return await fetchAndApply(event)
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, POST,PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-auth-code",
}

function handleOptions(request) {
    if (request.headers["Origin"] !== null &&
        request.headers["Access-Control-Request-Method"] !== null &&
        request.headers["Access-Control-Request-Headers"] !== null) {
        // Handle CORS pre-flight request.
        return {
            headers: corsHeaders,
            statusCode: 200,
        }
    } else {
        // Handle standard OPTIONS request.
        return {
            headers: {
                "Allow": "GET, HEAD, POST, PUT, OPTIONS",
            },
            statusCode: 200,
        }
    }
}

async function fetchAndApply(request) {


    if (request.httpMethod === "OPTIONS") {
        return handleOptions(request)
    }
    let resHeaders = {
        "Content-Type": "application/json;charset=UTF-8"
    }
    if (process.env.LAMBDA_DEV === 'yes') {
        resHeaders["Access-Control-Allow-Origin"] = "*"
    }

    let pathname = request.path.slice("/.netlify/functions/notion".length)
    console.log(pathname)
    let searchParams = request.queryStringParameters
    // SW 中无法缓存 POST 请求，notion 获取数据全是用的 POST 请求
    // 解决办法是把 POST 请求中的 body 转字符串，放在 url的查询参数中，在这里转换为 POST 请求
    body = searchParams.body
    let addHeader = {}
    let authCode = request.headers['auth-code']

    if (authCode && authCode === AUTH_CODE && token_v2) {
        // 本人操作
        // cookie NOT cookies
        addHeader = { cookie }
    }

    // todo 针对 CUD 请求添加 cookie
    let response = await axios.post(
        `https://www.notion.so${pathname}`,
        body,
        {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
                ...addHeader
            },
        })

    return {
        headers: resHeaders,
        statusCode: 200,
        body: JSON.stringify(response.data)
    }
}