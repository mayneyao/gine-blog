
const GitHub = require('github-api');

const gh = new GitHub({
    token: process.env.GitHubToken
});


const blogRepo = gh.getRepo('mayneyao', 'blog')


async function getAllBlogInfo() {
    const res = await blogRepo.getTree('master')
    let blogList = res.data.tree
    let d = {}
    blogList.map(item => {
        d[item.path] = item.sha
    })
    return d
}


async function getBlogData(sha) {
    let res =  await blogRepo.getBlob(sha)
    return res.data
}


async function updateOrCreate(path, data) {
    let res = await blogRepo.writeFile('master', path, data, 'update blog data from notion', {})
    if (res.status == 200 || res.status == 201) {
        return true
    } else {
        return false
    }
}

exports.getAllBlogInfo = getAllBlogInfo
exports.getBlogData = getBlogData
exports.updateOrCreate = updateOrCreate

// blogRepo.getTree('master').then(res=>{
//     console.log(res.data)
// })




