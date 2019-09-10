import React from 'react'
import { Link } from 'gatsby'


String.prototype.hashCode = function () {
    var hash = 0, i, chr
    if (this.length === 0) return hash
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0 // Convert to 32bit integer
    }
    return hash
}

const hashColorMap = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#009688',
    '#ff5722',
]

export const getHashColor = (tag) => {
    return hashColorMap[Math.abs(Math.ceil(tag.hashCode())) % 7]
}

const ColorfulTag = (props) => {
    let color = getHashColor(props.tag)
    return <Link to={props.to ? props.to : `tags/${props.tag}`}>
        <div style={{
            background: color,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            height: '24px',
            borderRadius: '3px',
            paddingLeft: '8px',
            paddingRight: '8px',
            fontSize: '14px',
            lineHeight: '120%',
            fontWeight: '400',
            margin: '0px 6px 6px 0px',
        }}>{
                props.tag
            }</div>
    </Link>


}

export default ColorfulTag
