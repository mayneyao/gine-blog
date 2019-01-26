import React from 'react'


const StateTag = (props) => {
    return <div style={{
        position: 'absolute',
        right: 0,
    }}>
        <div style={{
            position: 'absolute',
            right: 0,
            width: 0,
            height: 0,
            borderTop: `50px solid ${props.color || 'red'}`,
            borderLeft: '50px solid transparent'
        }}></div>

        <div style={{
            position: 'absolute',
            width: 50,
            height: 50,
            transform: 'rotate(45deg)',
            color: '#fff',
            right: '-4px',
            top: '9px'
        }}
        >{props.state}</div>
    </div>
}

export default StateTag