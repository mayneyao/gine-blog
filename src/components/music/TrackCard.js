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
    const { classes, theme, data, width, maxWidth } = props;

    return (
        <div className={classes.card}>
            <CardMedia
                className={classes.cover}
                image={data.album.images[1].url}
                title={data.album.name}
            />
            <div className={classes.details}>
                <div style={{
                    height: 64,
                    width: width,
                    background: '#eee'
                }}>
                    <Typography variant="subtitle1" color="textSecondary" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', position: "absolute", maxWidth: maxWidth }}>
                        {
                            data.preview_url ? <div><a target='_black' href={data.preview_url}> {data.name} </a></div> :
                                <div>{data.name} </div>
                        }
                        <div>
                            {data.artists.map(item => item.name).join('/')}
                        </div>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);