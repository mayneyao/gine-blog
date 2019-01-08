import React from 'react'
import NavBar from './navbar'

export default ({children}) => (
    <div>
        <NavBar/>
        <div style={{margin: `0 auto`}}>
            {children}
        </div>
    </div>
)
