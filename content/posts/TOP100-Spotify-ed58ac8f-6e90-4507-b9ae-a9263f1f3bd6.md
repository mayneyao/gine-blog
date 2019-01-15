---
title: 网易云音乐个人TOP100导出到 Spotify
date: 2018/11/07
tags: [音乐]
---



Spotify 开放了API，所以很简单转移歌单。已经很现成的应用来做这件事。

这里有个把网易云歌单转移到 Spotify 的网页程序： [https://yyrcd.com/2018/11/14/n2s/](https://yyrcd.com/2018/11/14/n2s/)

普通歌单直接用上面的转移就好了。个人top100，看了一下没有现成的轮子。下面是简单的代码，在浏览器的控制台下执行就可以玩了。

    let allSongsDiv = document.querySelectorAll('div.song > div.tt > div > span');
    let songList = [];
    allSongsDiv.forEach(item=>songList.push(item.innerText));
    let clearSongList = songList.map(item=>{
      let [name,artist] = item.split(" -");
      return `${name} - ${artist}`
    })
    
    let text = clearSongList.join('\n');
    text

网易云音乐web版，访问 [https://music.163.com/#/user/songs/rank?id=](https://music.163.com/#/user/songs/rank?id=)<个人用户ID>

控制台下执行上述指令，显示个人听歌TOP前100的歌曲。copy下来在 [https://www.spotlistr.com/search/textbox](https://www.spotlistr.com/search/textbox) 中导入即可