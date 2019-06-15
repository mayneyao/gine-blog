import React from 'react'
import Bottom from './bottom'
import '../index.css'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import 'typeface-roboto'
import NavList from './nav-list'
import { Helmet } from "react-helmet"
import PlayingMusic from './music/CurrentPlayingMusic'
import PlayingGame from './game/CurrentPlayingGame'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import throttle from 'lodash/throttle'
import Axios from "axios"
import config from '../../config'
import SearchButton from './search/search'

const styles = {
    root: {
        position: 'fixed',
        top: 0,
    },
    menuButton: {
        top: 0,
        marginLeft: 0,
        marginRight: 20,
        position: 'absolute',
        zIndex: 100
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
        this.fetchData()
    }

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            iOS: undefined,
            height: 0,
            data: {
                music: {},
                game: {}

            }
        }
        this.fetchData = throttle(this._fetchData, 10000)
    }

    _fetchData = () => {
        Axios.get('https://api.gine.me/currently_playing').then(res => {
            this.setState({
                data: res.data
            })
        })
    }

    back2Top = () => {
        let top = document.getElementById("top")
        top.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    }

    componentDidMount() {
        const iOS = process.browser &&
            /iPad|iPhone|iPod/.test(navigator.userAgent)

        let height = window.innerHeight || document.body.clientHeight ||
            document.documentElement.clientHeight

        // 优化移动端滚动
        // document.addEventListener('touchstart', onTouchStart, {passive: true});

        this.setState({
            iOS,
            height,
        })
        if (config.now.open) {
            this.fetchData()
        }
    }


    render() {
        const { open, iOS, height, data: { music, game } } = this.state
        const { classes, title } = this.props
        return (

            <div style={{ background: '#f3f5f7' }}>
                <Helmet defaultTitle={`${config.blogMeta.title}${title ? ` - ${title}` : ""}`}>
                    <html lang="zh-cmn-Hans" />
                    <meta name="description" content={`${config.blogMeta.title} 博客 python react gine`} />
                    <noscript>
                        为了更好的浏览体验，请不要在本页面禁用 Javascript 🙂
                    </noscript>
                </Helmet>

                <SwipeableDrawer
                    disableBackdropTransition={!iOS}
                    disableDiscovery={iOS}
                    open={open}
                    onOpen={this.toggleDrawer(true)}
                    SwipeAreaProps={{ onMouseEnter: this.toggleDrawer(true) }}
                    onClose={this.toggleDrawer(false)}>
                    <div
                        className={classes.drawer}
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <NavList />
                        <Divider />
                        {
                            config.now.open && <div>
                                <PlayingMusic data={music} />
                                <PlayingGame data={game} />
                            </div>
                        }
                    </div>
                </SwipeableDrawer>
                {/* <AppBar position="sticky">
                    <Toolbar style={{ minHeight: 48 }}> */}
                <div style={{
                    height: 40,
                    position: fixed,
                    background: "#fff",
                    width: '100%',
                    top: 0,
                    zIndex: 999,
                }} onClick={this.back2Top} id="Top">
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    {config.blog.search.open && <SearchButton />}
                </div>

                {/* </Toolbar>
                </AppBar> */}
                <div style={{ margin: `0 auto` }}>
                    {this.props.children}
                </div>

                <Bottom />
            </div>
        )
    }
}

export default withStyles(styles)(Layout)
