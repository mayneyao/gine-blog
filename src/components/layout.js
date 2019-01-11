import React from 'react'
import Bottom from './bottom'
import '../index.css'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import 'typeface-roboto'

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
        console.log('11111')
        this.setState({
            open: open,
        })
    }

    constructor (props) {
        super(props)
        this.state = {
            open: false,
            iOS: undefined,
        }
    }

    componentDidMount () {
        const iOS = process.browser &&
            /iPad|iPhone|iPod/.test(navigator.userAgent)
        this.setState({
            iOS,
        })
    }

    render () {
        const {open, iOS} = this.state
        const {classes} = this.props
        return (
            <div>
                <SwipeableDrawer
                    disableBackdropTransition={!iOS}
                    disableDiscovery={iOS}
                    open={open}
                    onOpen={this.toggleDrawer(true)}
                    SwipeAreaProps={{onMouseEnter: this.toggleDrawer(true)}}
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
                </SwipeableDrawer>

                <div style={{margin: `0 auto`}}>
                    {this.props.children}
                </div>
                <Bottom/>
            </div>
        )
    }
}

export default withStyles(styles)(Layout)
