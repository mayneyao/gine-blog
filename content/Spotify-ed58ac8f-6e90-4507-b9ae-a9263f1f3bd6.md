---
title: 网易云歌单导出到Spotify
date: 2018/11/08
tags: [音乐]
---

```js
let allSongsDiv = document.querySelectorAll('div.song > div.tt > div > span');
let songList = [];
allSongsDiv.forEach(item=>songList.push(item.innerText));
let clearSongList = songList.map(item=>{
  let [name,artist] = item.split(" -");
  return `${name} - ${artist}`
})

let text = clearSongList.join('\n');
text
```

网易云音乐web版，访问 [https://music.163.com/#/user/songs/rank?id=](https://music.163.com/#/user/songs/rank?id=)<个人用户ID>

控制台下执行上述指令，显示个人听歌TOP前100的歌曲。copy下来在 [https://www.spotlistr.com/search/textbox](https://www.spotlistr.com/search/textbox) 中导入即可
