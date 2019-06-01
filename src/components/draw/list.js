import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { parseImageUrl } from '../../notion/api'
import dayjs from 'dayjs'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: '#fff',
        width: 400,
        margin: '0 auto'
    },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ImageGridList(props) {
    const classes = useStyles();
    const data = props.data.sort((a, b) => dayjs(b.date) - dayjs(a.date))
    return (
        <div className={classes.root}>

            {
                data.map(pic => (
                    <div>
                        <h3>{pic.date}</h3>
                        <img src={parseImageUrl(pic.image, 400)} alt={pic.name} loading="lazy" />
                        <div>{pic.comment}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default ImageGridList;
