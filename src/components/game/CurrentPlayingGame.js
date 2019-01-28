
import React from 'react'
import GamepadIcon from "@material-ui/icons/Gamepad"
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
                data && data.response && <div>
                    <ListItem button>
                        <ListItemIcon>
                            <GamepadIcon style={{ color: '#e91e63' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<a target='_blank' href={`https://store.steampowered.com/app/${data.response.players[0].gameid}`}>{data.response.players[0].gameextrainfo}</a>}
                            secondary={'Steam'}
                        />
                    </ListItem>
                </div>
            }
        </div>
    }

}