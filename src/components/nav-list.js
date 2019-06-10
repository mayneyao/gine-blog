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
import BookListIcon from '@material-ui/icons/LibraryBooks'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import ArchiveIcon from '@material-ui/icons/Archive'
import MusicIcon from '@material-ui/icons/Headset'
import FriendIcon from '@material-ui/icons/People'
import PaletteIcon from '@material-ui/icons/Palette'
import MomentIcon from '@material-ui/icons/Camera'

import CardMedia from '@material-ui/core/CardMedia'
import { Link } from 'gatsby'

import avatar from '../static/41546411364_.pic.jpg' // 需要自定义头像修改此处
import config from '../../config'


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />
}

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
            <MyLink to={'/'}>
                <CardMedia
                    className={classes.media}
                    image={avatar}
                    title="Contemplative Reptile"
                />
            </MyLink>
            <List component="nav">
                <MyLink to={'/'}>
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

                <MyLink to={`posts/${config.blogMeta.aboutPostSlug}/`}>
                    <ListItem button>
                        <ListItemIcon>
                            <AboutIcon style={{ color: '#ffc107' }} />
                        </ListItemIcon>
                        <ListItemText primary="关于" />
                    </ListItem>
                </MyLink>

                {
                    config.book.open && <MyLink to={'books'}>
                        <ListItem button>
                            <ListItemIcon>
                                <BookListIcon style={{ color: '#607d8b' }} />
                            </ListItemIcon>
                            <ListItemText primary="书单" />
                        </ListItem>
                    </MyLink>
                }

                {
                    config.music.open && <MyLink to={'music'}>
                        <ListItem button>
                            <ListItemIcon>
                                <MusicIcon style={{ color: '#00bfa5' }} />
                            </ListItemIcon>
                            <ListItemText primary="音乐" />
                        </ListItem>
                    </MyLink>
                }

                {
                    config.bangumi.open && <MyLink to={'bangumi'}>
                        <ListItem button>
                            <ListItemIcon>
                                <SubscriptionsIcon style={{ color: '#af52bf' }} />
                            </ListItemIcon>
                            <ListItemText primary="番剧" />
                        </ListItem>
                    </MyLink>
                }
                {
                    config.draw.open && <MyLink to={'v2draw'}>
                        <ListItem button>
                            <ListItemIcon>
                                <PaletteIcon style={{ color: '#00bcd4' }} />
                            </ListItemIcon>
                            <ListItemText primary="绘画" />
                        </ListItem>
                    </MyLink>
                }
                {
                    config.moments.open && <MyLink to={'moments'}>
                        <ListItem button>
                            <ListItemIcon>
                                <MomentIcon style={{ color: '#4a148c' }} />
                            </ListItemIcon>
                            <ListItemText primary="动态" />
                        </ListItem>
                    </MyLink>
                }

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
