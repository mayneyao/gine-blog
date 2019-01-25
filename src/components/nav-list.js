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
import ArchiveIcon from '@material-ui/icons/Archive'
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

function SimpleList (props) {
    const {classes} = props

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
                            <HomeIcon color={'primary'}/>
                        </ListItemIcon>
                        <ListItemText primary="主页"/>
                    </ListItem>
                </MyLink>

                <MyLink to={'tags'}>
                    <ListItem button>
                        <ListItemIcon>
                            <TagIcon style={{color: '#673ab7'}}/>
                        </ListItemIcon>
                        <ListItemText primary="标签"/>
                    </ListItem>
                </MyLink>

                <MyLink to={'archives'}>
                    <ListItem button>
                        <ListItemIcon>
                            <ArchiveIcon style={{color: '#f44336'}}/>
                        </ListItemIcon>
                        <ListItemText primary="归档"/>
                    </ListItem>
                </MyLink>

                <MyLink to={'posts/about-75e97121-85e7-414e-838b-a4fd283f5616/'}>
                    <ListItem button>
                        <ListItemIcon>
                            <AboutIcon style={{color: '#ffc107'}}/>
                        </ListItemIcon>
                        <ListItemText primary="关于"/>
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
