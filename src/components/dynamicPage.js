import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import LinearProgress from '@material-ui/core/LinearProgress'

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
        const { url } = this.props
        let _url = url
        if (process.env.NODE_ENV === 'development') {
            _url = `http://127.0.0.1:9000/${url}`
        } else {
            _url = `/.netlify/functions/${url}`
        }
        axios.get(_url).then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
        })
    }

    render() {
        const { data, loading } = this.state
        const { itemComponent, sortFunc, title, style, className } = this.props
        let sortData = data


        if (sortFunc) {
            sortData = data.sort(sortFunc)
        }

        return (
            <Layout title={title}>
                <div style={{ width: '100%', position: 'fixed', top: '0', zIndex: 999 }}>
                    {loading && <LinearProgress />}
                </div>
                <div style={{ width: '100%', ...style }} className={className}>
                    {
                        sortData.map(item => React.createElement(itemComponent, { data: item, key: item.slug }))
                    }
                </div>
            </Layout >
        )
    }
}

export default withRoot(withStyles(styles)(ImageGallery))