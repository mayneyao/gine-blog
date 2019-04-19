const { queryCollection } = require('./api')
const fs = require("fs")
const path = require("path")

syncAphorisms = async () => {
    let res = await queryCollection('https://www.notion.so/gine/b23848d867974c36a2902ec4cb833453?v=29915c889d4c415cbfb9e9bf7dd49afd')
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
