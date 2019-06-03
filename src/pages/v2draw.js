import React from 'react'
import config from '../../config'
import axios from 'axios'
import ImageList from '../components/draw/list'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import LinearProgress from '@material-ui/core/LinearProgress'
import { width } from 'window-size';

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
        if (config.draw.open) {
            axios.get(`/.netlify/functions/notion?url=${config.draw.url}`).then(res => {
                // axios.get(`http://127.0.0.1:9000/notion?url=${config.draw.url}`).then(res => {
                this.setState({
                    data: res.data,
                    loading: false
                })
            })
        }

    }
    render() {
        const { data, loading } = this.state
        return (
            <Layout title="Mayne 的绘画之路">
                <div style={{ width: '100%' }}>
                    {loading && <LinearProgress />}
                </div>
                <div style={{ width: '100%' }}>
                    <ImageList data={data} />
                </div>
            </Layout >
        )
    }
}

export default withRoot(withStyles(styles)(ImageGallery))