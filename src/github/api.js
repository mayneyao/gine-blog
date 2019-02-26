
const GitHub = require('github-api');

const gh = new GitHub({
    token: process.env.GitHubToken
});


const blogRepo = gh.getRepo('mayneyao', 'blog')


async function getAllBlogInfo() {
    const res = await blogRepo.getTree('master')
    let blogList = res.data.tree
    let res = {}
    blogList.map(item => {
        res[item.path] = item.sha
    })
    return res
}


async function getBlogData(sha) {
    res = blogRepo.getBlob('453835395ad73c40fb28a1bde28aa8c22fef37a5')
    return JSON.parse(res.data)
}


async function updateOrCreate(path, data) {
    blogRepo.writeFile('master', path, data, 'update blog data from notion', {}).then(res => {
        if (res.status == 200 || res.status == 201) {
            return true
        } else {
            return false
        }
    })
}

exports.getAllBlogInfo = getAllBlogInfo
exports.getBlogData = getBlogData

// blogRepo.getTree('master').then(res=>{
//     console.log(res.data)
// })




