import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    index: {
        margin: '0 auto',
        maxWidth: 800,
        marginTop: '1em',
    },
})

class Index extends React.Component {
    componentDidMount () {
        window.location.href = '/page/1'
    }

    render () {
        const {classes} = this.props

        return (
            <Layout>
                <div className={classes.index}>
                    <LinearProgress/>
                </div>
            </Layout>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Index))
