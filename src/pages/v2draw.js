import React from 'react'
import config from '../../config'
import axios from 'axios'
import ImageList from '../components/draw/list'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'

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
            data: []
        }
    }

    componentDidmount() {
        if (config.draw.open) {
            axios.get(`/.netlify/functions/notion?url=${config.draw.url}`).then(res => {
                this.setState({
                    data: res.data
                })
            })
        }

    }
    render() {
        const { data } = this.state
        return (
            <Layout>
                <ImageList data={data} />
            </Layout>
        )
    }
}

export default withRoot(withStyles(styles)(ImageGallery))