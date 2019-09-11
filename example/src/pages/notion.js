
import React from 'react'
import Notabase from 'notabase'



export default ()=>{
    let nb = new Notabase({
        proxy:{
            url:'http://localhost:9000/.netlify/functions/notion'
        }
    })
    nb.fetch("https://www.notion.so/gine/985e04f545f844a3b76cd53452597ce3?v=a8a081148ad84e8f9d0f859931fa0274").then(res=>{
        console.log(res)
    })
    return (
        <div>notion</div>
    )
}



