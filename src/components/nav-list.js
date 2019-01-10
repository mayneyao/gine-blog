import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/Inbox'
import HomeIcon from '@material-ui/icons/Home'
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
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="主页"/>
                    </ListItem>
                </MyLink>
                <MyLink to={'about'}>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon/>
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
