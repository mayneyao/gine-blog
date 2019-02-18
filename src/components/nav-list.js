import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import TagIcon from '@material-ui/icons/Bookmark'
import AboutIcon from '@material-ui/icons/Person'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import ArchiveIcon from '@material-ui/icons/Archive'
import MusicIcon from '@material-ui/icons/Headset'
import FriendIcon from '@material-ui/icons/People'


import CardMedia from '@material-ui/core/CardMedia'
import { Link } from 'gatsby'
import avatar from '../static/41546411364_.pic.jpg'


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 200,
    },
})

const MyLink = props => <Link {...props} />

function SimpleList(props) {
    const { classes } = props

    return (
        <div className={classes.root}>
            <MyLink to={'/page/1'}>
                <CardMedia
                    className={classes.media}
                    image={avatar}
                    title="Contemplative Reptile"
                />
            </MyLink>
            <List component="nav">
                <MyLink to={'/page/1'}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon color={'primary'} />
                        </ListItemIcon>
                        <ListItemText primary="主页" />
                    </ListItem>
                </MyLink>

                <MyLink to={'tags'}>
                    <ListItem button>
                        <ListItemIcon>
                            <TagIcon style={{ color: '#673ab7' }} />
                        </ListItemIcon>
                        <ListItemText primary="标签" />
                    </ListItem>
                </MyLink>

                <MyLink to={'archives'}>
                    <ListItem button>
                        <ListItemIcon>
                            <ArchiveIcon style={{ color: '#f44336' }} />
                        </ListItemIcon>
                        <ListItemText primary="归档" />
                    </ListItem>
                </MyLink>

                <MyLink to={'posts/10a70927d25a43d19acf14e0d36354e7/'}>
                    <ListItem button>
                        <ListItemIcon>
                            <AboutIcon style={{ color: '#ffc107' }} />
                        </ListItemIcon>
                        <ListItemText primary="关于" />
                    </ListItem>
                </MyLink>

                <MyLink to={'music'}>
                    <ListItem button>
                        <ListItemIcon>
                            <MusicIcon style={{ color: '#00bfa5' }} />
                        </ListItemIcon>
                        <ListItemText primary="音乐" />
                    </ListItem>
                </MyLink>

                <MyLink to={'bangumi'}>
                    <ListItem button>
                        <ListItemIcon>
                            <SubscriptionsIcon style={{ color: '#af52bf' }} />
                        </ListItemIcon>
                        <ListItemText primary="番剧" />
                    </ListItem>
                </MyLink>
                <MyLink to={'links'}>
                    <ListItem button>
                        <ListItemIcon>
                            <FriendIcon style={{ color: '#e91e63' }} />
                        </ListItemIcon>
                        <ListItemText primary="友链" />
                    </ListItem>
                </MyLink>
            </List>
        </div>
    )
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleList)
