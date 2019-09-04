const { queryCollection } = require('./api')
const fs = require("fs")
const path = require("path")
const config = require('../../config');

syncAphorisms = async () => {
    let res = await queryCollection(config.aphorisms.url)
    let data = JSON.stringify(res)

    let rootPath = path.dirname(path.dirname(__dirname))
    let dataPath = `${rootPath}/public/static/aphorisms.json`

    fs.writeFile(dataPath, data, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log("格言保存成功")
        }
    })
}

// syncAphorisms()

module.exports = { syncAphorisms }
