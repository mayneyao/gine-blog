// It's not ready yet: https://github.com/gatsbyjs/gatsby/issues/8237.
//
// import React from 'react';
// import withRoot from './src/withRoot';

// const WithRoot = withRoot(props => props.children);

// export const wrapRootElement = ({ element }) => {
//   return <WithRoot key={Math.random()}>{element}</WithRoot>;
// };

import config from './config'


export const onServiceWorkerUpdateFound = () => {
    const answer = window.confirm(
        `好久不见，站点已经更新了。` +
        `重新加载，展示新页面？`
    )

    if (answer === true) {
        // 触发自动 build 流程
        // fetch 坑真多🤯 还是 axios 好 

        if (config.blog.autoBuild.open && Math.random() * 100 <= config.blog.autoBuild.proportion) {
            fetch(`/.netlify/functions/autoBuild`).then(res => {
                console.log(res.data)
                window.location.reload()
            }).catch(error => {
                console.error('Error:', error)
                window.location.reload()
            })
        } else {
            window.location.reload()
        }
    }
}

// 注册自定义 sw 
// 参见：https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/#using-a-custom-service-worker-in-gatsby
// export const registerServiceWorker = () => true
