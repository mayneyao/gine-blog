// It's not ready yet: https://github.com/gatsbyjs/gatsby/issues/8237.
//
// import React from 'react';
// import withRoot from './src/withRoot';

// const WithRoot = withRoot(props => props.children);

// export const wrapRootElement = ({ element }) => {
//   return <WithRoot key={Math.random()}>{element}</WithRoot>;
// };

export const onServiceWorkerUpdateFound = () => {
    const answer = window.confirm(
        `好久不见，站点已经更新了。` +
        `重新加载，展示新页面？`
    )

    if (answer === true) {
        window.location.reload()
    }
}

// 注册自定义 sw 
// 参见：https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/#using-a-custom-service-worker-in-gatsby
// export const registerServiceWorker = () => true
