
import React from 'react'
import MuiscIcon from "@material-ui/icons/MusicNote"
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    render() {

        const { data } = this.props
        return <div>
            {
                data && data.item && <div>
                    <ListItem button>
                        <ListItemIcon>
                            <MuiscIcon style={{ color: '#2196f3' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<a href={data.item.external_urls.spotify} target="_blank"> {data.item.name}</a>}
                            secondary={'Spotify'}
                        />
                    </ListItem>
                </div>
            }
        </div>
    }

}