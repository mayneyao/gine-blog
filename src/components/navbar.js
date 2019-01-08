import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'gatsby'

const styles = {
    root: {
        position: 'fixed',
        top: 0,
    },
    menuButton: {
        marginLeft: 10,
        marginRight: 10,
    },
}

function DenseAppBar (props) {
    const {classes} = props
    const MyLink = props => <Link to="/" {...props} />
    return (
        <div className={classes.root}>

            <IconButton className={classes.menuButton} color="inherit"
                        aria-label="Menu" component={MyLink}>
                <MenuIcon/>
            </IconButton>


        </div>
    )
}

DenseAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DenseAppBar)
