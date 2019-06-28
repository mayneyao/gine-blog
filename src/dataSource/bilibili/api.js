const api = require('../../components/bangumi/api')

const data2csv = async () => {
    let data = await api.getBangumiData()
    // console.log(data)
    // let lineFormater = `name,comment,end,is_watched,publish,show_stars,stars,tags,type,where`
    let res = data.map(item => {
        const { title, } = item
        return `${title},,,Yes,,,,"动漫",番剧,Bilibili`
    }).join("\n")
    console.log(res)
}

data2csv()