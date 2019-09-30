import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '../mui-override/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'gatsby'
import getImageByName from '../utils/notion-hash-image'
import ColorfulTag from '../utils/hash-colorful-tag'
import { parseImageUrl } from 'notabase/src/utils'

const styles = {
    card: {
        maxWidth: 800,
        margin: '1em auto',
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
}

function notionImageResize(url, width) {
    let encodedUrl = encodeURIComponent(url)
    return `https://notion.so/image/${encodedUrl}?width=${width}`
}

function ImgMediaCard(props) {
    const { classes, title, content, slug, format, tags, date } = props
    const MyLink = props => <Link to={`posts/${slug}`} {...props} />
    let coverImageUrl
    if (format && format.page_cover) {
        let cover = format.page_cover
        coverImageUrl = parseImageUrl(cover, 520)
    } else {
        coverImageUrl = notionImageResize(getImageByName(slug), 520)
    }
    return (
        <Card className={classes.card}>
            <CardActionArea component={MyLink}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image={coverImageUrl}
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
                <div style={{
                    background: '#eee',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                    height: '24px',
                    borderRadius: '3px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    fontSize: '14px',
                    lineHeight: '120%',
                    fontWeight: '400',
                    margin: '0px 6px 6px 0px',
                }}>{date}</div>
                {
                    tags && tags.map(tag => <ColorfulTag tag={tag} key={tag} />)
                }
            </CardActions>
        </Card>
    )
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ImgMediaCard)
