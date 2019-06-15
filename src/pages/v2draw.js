import React from 'react'
import withRoot from '../withRoot'
import DynamicPage from '../components/dynamicPage'
import draw from '../components/draw/item'
import config from '../../config'
import dayjs from 'dayjs'

function Draw(props) {
    const style = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        width: 400,
        margin: '0 auto'
    }
    let url = `notion?url=${config.draw.url}`
    return (
        <DynamicPage
            style={style}
            url={url}
            itemComponent={draw}
            sortFunc={(a, b) => dayjs(b.date) - dayjs(a.date)}
            title="动态"
        />
    )
}

export default withRoot(Draw)
