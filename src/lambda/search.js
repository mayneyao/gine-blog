const notion = require('../notion/api')

exports.handler = async (event, context) => {
    const { table, query } = event.queryStringParameters
    // table 要搜索表格的 fullID 。 例如：b8081722-312b-44fe-a0ff-1d143210b3fb 这种形式的
    // query 要查询的字符串
    let response = await notion.search(table, query)
    let headers = {
        "Content-Type": "application/json;charset=UTF-8"
    }

    if (process.env.LAMBDA_DEV === 'yes') {
        headers["Access-Control-Allow-Origin"] = "*"
    }
    return {
        headers,
        statusCode: 200,
        body: JSON.stringify(response)
    }
}