import React from 'react'
import LoveIcon from '@material-ui/icons/Favorite'
import CopyrightIcon from '@material-ui/icons/Copyright'
import ULink from './link-without-underline'

export default () => (
    <div style={{margin: `1em 0 auto auto`, textAlign: 'center'}}>
        Build with <ULink href="https://www.gatsbyjs.org" text="gatsby"/>,
        <ULink href="https://reactjs.org" text="react"/>,
        <ULink href="https://material-ui.com/"
               text="material-ui"/> and <LoveIcon
        color='primary'
        style={{fontSize: '0.9em'}}/>

        <div>
            Copyright 2019 <CopyrightIcon style={{fontSize: '0.9em'}}/> <ULink
            href="https://github.com/mayneyao" text="Mayne"/>
        </div>
    </div>
)   
