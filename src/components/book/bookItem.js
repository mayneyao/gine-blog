import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ColorfulTag from '../hash-colorful-tag'

import StateTag from '../bangumi/StateTag';

const styles = theme => ({
    card: {
        display: 'flex',
        height: 200,
        width: 420,
        margin: '10px',
        position: 'relative'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 150,
        objectFit: 'cover',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

function notionImageResize(url, width) {
    let encodedUrl = encodeURIComponent(url)
    return `https://notion.so/image/${encodedUrl}?width=${width}`
}

function MediaControlCard(props) {
    const { classes, theme, data: { node: {
        name, comment, cover_image, slug, stars, start, status, tags
    } } } = props;

    const CSMap = {
        '在读': '#f44336',
        '已读': '#9e9e9e',
        '暂缓': '#607d8b',
        '待读': '#795548',
        '待购': '#ffc107'
    }

    return (
        <Card className={classes.card}>
            <StateTag state={status} color={CSMap[status]} />
            <CardMedia
                className={classes.cover}
                image={notionImageResize(cover_image, 150)}
                title={name}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {name}
                    </Typography>
                    {
                        stars && Array(parseInt(stars) + 1).join("⭐️")
                    }
                    <div style={{ display: 'flex' }}>
                        {
                            tags && tags.map(tag => <ColorfulTag tag={tag} key={tag} to={`books`} />)
                        }
                    </div>

                    <Typography variant="subtitle1" color="textSecondary" noWrap>
                        {comment}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
