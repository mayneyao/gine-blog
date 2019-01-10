import React from 'react'
import Bottom from './bottom'
import '../index.css'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

import NavList from './nav-list'

const styles = {
    root: {
        position: 'fixed',
        top: 0,
    },
    menuButton: {
        marginLeft: 10,
        marginRight: 10,
    },
    drawer: {
        width: 300,
    },
}

class Layout extends React.Component {
    toggleDrawer = (open) => () => {
        this.setState({
            open: open,
        })
    }

    constructor (props) {
        super(props)
        this.state = {
            open: false,
        }
    }

    render () {
        const {open} = this.state
        const {classes} = this.props
        return (
            <div>
                <Drawer open={open}
                        onClose={this.toggleDrawer(false)}>
                    <div
                        className={classes.drawer}
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <NavList/>
                    </div>
                </Drawer>
                <div className={classes.root}>

                    <IconButton className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                onClick={this.toggleDrawer(true)}
                                onMouseEnter={this.toggleDrawer(true)}
                    >
                        <MenuIcon/>
                    </IconButton>


                </div>
                <div style={{margin: `0 auto`}}>
                    {this.props.children}
                </div>
                <Bottom/>
            </div>
        )
    }
}

export default withStyles(styles)(Layout)
