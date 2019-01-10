import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'gatsby'
import getImageByName from '../utils/notion-hash-image'

import ColorfulTag from './hash-colorful-tag'

const styles = {
    card: {
        maxWidth: 800,
        marginBottom: '2em',
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
}

function ImgMediaCard (props) {
    const {classes, title, content, slug, image, tags} = props
    const MyLink = props => <Link to={slug} {...props} />
    console.log(slug, slug.hashCode(), slug.hashCode() % 8)
    return (
        <Card className={classes.card}>
            <CardActionArea component={MyLink}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image={image || getImageByName(slug)}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography component="p">
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {
                    tags && tags.map(tag => <ColorfulTag tag={tag} key={tag}/>)
                }
            </CardActions>
        </Card>
    )
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ImgMediaCard)
