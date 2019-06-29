import React from 'react';


export default function MomentMusicCard(props) {
    const { link } = props
    let url = new URL(link)
    if (url.hostname == "open.spotify.com") {
        let pathList = url.pathname.split('/')
        let trackID = pathList[pathList.length - 1]
        return (
            <iframe src={`https://open.spotify.com/embed/track/${trackID}`} width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        )
    } else {
        return (
            <div>{link}</div>
        )
    }
}