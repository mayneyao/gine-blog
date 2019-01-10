import React from 'react'

export default (props) => (
    <a href={props.href} style={{textDecoration: 'none'}} target='__blank'>
        {props.text}
    </a>
)
