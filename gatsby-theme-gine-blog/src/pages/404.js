import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout/index'


const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
})

function NotFound(props) {
    const { classes } = props

    return (
        <Layout title="404">
            <div className={classes.root}>
                <Typography variant="display1" gutterBottom>
                    404 Not Found!
            </Typography>
            </div>
        </Layout>

    )
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(NotFound))
