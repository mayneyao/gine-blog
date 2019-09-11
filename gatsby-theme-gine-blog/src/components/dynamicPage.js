import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Notabase from 'notabase'
import withRoot from '../withRoot'
import Layout from './layout/index'
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
        let _url
        if (process.env.NODE_ENV === 'development') {
            _url = `http://127.0.0.1:9000/.netlify/functions/notion`
        } else {
            _url = `/.netlify/functions/notion`
        }
        let nb = new Notabase({
            proxy: {
                url: _url
            }
        })
        
        nb.fetch(url).then(res => {
            this.setState({
                data: res.rows,
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