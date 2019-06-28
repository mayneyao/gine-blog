
const notion = require('../notion/api')
const config = require('../../config')

exports.handler = async (event, context) => {
    // 获取 build 信息
    let oldBuild = event.queryStringParameters.build
    let res = await notion.queryCollection(config.blog.url)
    res = res.filter(item => item && item.public_date && item.status == '已发布')
    // 获取已发布文章的最后更新时间戳总和, build 标记
    let newBuild = res.reduce((a, b) => new Date(a.last_edited_time).getTime() + new Date(b.last_edited_time).getTime())

    if (newBuild > parseInt(oldBuild)) {
        // 触发 build 请求
        fetch(`https://api.netlify.com/build_hooks/${process.env.AutoBuildToken}`, {
            method: 'POST',
            body: `{}`,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
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