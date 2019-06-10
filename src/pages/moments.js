import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import LinearProgress from '@material-ui/core/LinearProgress'
import Moment from '../components/moment'
import { parseImageUrl } from '../notion/api'
import config from '../../config'
import dayjs from 'dayjs'

const styles = theme => ({
    index: {
        margin: '0 auto',
        maxWidth: 800,
        marginTop: '1em',
    },
})


class ImageGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true
        }
    }

    componentDidMount() {
        if (config.moments.open) {
            axios.get(`/.netlify/functions/notion?url=${config.moments.url}`).then(res => {
                // axios.get(`http://127.0.0.1:9000/notion?url=${config.moments.url}`).then(res => {
                this.setState({
                    data: res.data,
                    loading: false
                })
            })
        }

    }

    formatItems = (images) => {
        return images.map(item => {
            return {
                src: parseImageUrl(item),
            }
        })

    }
    render() {
        const { data, loading } = this.state

        return (
            <Layout title="动态">
                <div style={{ width: '100%' }}>
                    {loading && <LinearProgress />}
                </div>
                <div style={{ width: '100%' }}>
                    {
                        data.sort((a, b) => dayjs(a.created_time) < dayjs(b.created_time) ? 1 : -1)
                            .map(item => <Moment content={item.content} images={this.formatItems(item.images || [])} time={item.created_time} />)
                    }
                </div>
            </Layout >
        )
    }
}

export default withRoot(withStyles(styles)(ImageGallery))