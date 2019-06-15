
const notion = require('../notion/api')

exports.handler = async (event, context) => {
    let notionUrl = event.queryStringParameters.url
    let response = await notion.queryCollection(notionUrl)

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