import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 64,
        height: 64,
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

function MediaControlCard(props) {
    const { classes, theme, data } = props;

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cover}
                image={data.album.images[1].url}
                title={data.album.name}
            />
            <div className={classes.details}>
                <div style={{
                    height: 64,
                    width: `${data.popularity * 10}px`,
                    background: '#eee'
                }}>
                    <Typography variant="subtitle1" color="textSecondary">
                        {
                            data.preview_url ? <div><a target='_black' href={data.preview_url}> {data.name} </a> - {data.artists.map(item => item.name)}</div> :
                                <div>{data.name} - {data.artists.map(item => item.name)}</div>
                        }
                    </Typography>
                </div>
            </div>
        </Card>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);