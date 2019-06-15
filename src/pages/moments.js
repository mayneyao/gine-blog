import React from 'react'
import withRoot from '../withRoot'
import DynamicPage from '../components/dynamicPage'
import moment from '../components/moment/moment'
import config from '../../config'
import dayjs from 'dayjs'

function Moments(props) {
    const style = {
        margin: '0 auto',
        maxWidth: 800,
        paddingTop: '10px'
    }
    let url = `notion?url=${config.moments.url}`
    return (
        <DynamicPage
            style={style}
            url={url}
            itemComponent={moment}
            sortFunc={(a, b) => dayjs(b.created_time) - dayjs(a.created_time)}
            title="动态"
        />
    )
}

export default withRoot(Moments)
