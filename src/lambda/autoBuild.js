
const notion = require('../notion/api')
const config = require('../../config')
const axios = require('axios')

exports.handler = async (event, context) => {
    // 获取 build 信息
    let oldBuild = event.queryStringParameters.build
    let res = await notion.queryCollection(config.blog.url)
    res = res.filter(item => item && item.public_date && item.status == '已发布')
    // 获取已发布文章的最后更新时间戳总和, build 标记
    let buildTimes = res.map(item => new Date(item.last_edited_time).getTime())
    let newBuild = buildTimes.reduce((a, b) => a + b)

    if (newBuild > parseInt(oldBuild)) {
        // 触发 build 请求
        axios.post(`https://api.netlify.com/build_hooks/${process.env.AutoBuildToken}`, {})
            .then(res => console.log(`new build`))
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    let headers = {
        "Content-Type": "application/json;charset=UTF-8"
    }

    if (process.env.LAMBDA_DEV === 'yes') {
        headers["Access-Control-Allow-Origin"] = "*"
    }
    return {
        headers,
        statusCode: 200,
        body: JSON.stringify({ build: newBuild })
    }
}