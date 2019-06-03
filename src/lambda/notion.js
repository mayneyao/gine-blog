
const notion = require('../notion/api')

exports.handler = async (event, context) => {
    let notionUrl = event.queryStringParameters.url
    let response = await notion.queryCollection(notionUrl)
    return {
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        statusCode: 200,
        body: JSON.stringify(response)
    }
}