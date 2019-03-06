import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import StateTag from './StateTag'

const styles = {
    card: {
        maxWidth: 345,
        margin: '1em auto'
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
        height: '100%'
    },
};

function ImgMediaCard(props) {
    const { classes, data } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                {
                    data.is_finish ? <StateTag state={'完结'} color='gray' /> : <StateTag state={'连载'} color='darkcyan' />
                }

                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image={`/static/${data.cover.split('/').pop()}`}
                    title={data.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography component="p">
                        {data.brief}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" href={data.share_url} target="_blank">
                    查看详情
                </Button>
            </CardActions>
        </Card>
    );
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);