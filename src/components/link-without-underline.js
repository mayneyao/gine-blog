import React from 'react'

export default (props) => (
    <a href={props.href} style={{textDecoration: 'none'}}>
        {props.text}
    </a>
)
