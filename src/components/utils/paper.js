import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        boxShadow: '0 8px 18px rgba(0,0,0,.06)',
    },
})

function PaperSheet (props) {
    const {classes} = props

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                {props.children}
            </Paper>
        </div>
    )
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PaperSheet)
