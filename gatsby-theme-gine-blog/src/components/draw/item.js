import React from 'react';
import { parseImageUrl } from '../../notion/api'


function ImageGridListItem(props) {
    const { date, image, name, comment } = props.data
    return (
        <div>
            <h3>{date}</h3>
            <img src={parseImageUrl(image[0], 400)} alt={name} loading="lazy" />
            <div>{comment}</div>
        </div>
    );
}
export default ImageGridListItem;
