import Axios from "axios"


import React from 'react'
import { Divider } from "@material-ui/core"

import TrackCard from './TrackCard'


export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        Axios.get('https://api.gine.me').then(res => {
            console.log(res)
            this.setState({
                data: res.data
            })
        })
    }

    render() {

        const { data } = this.state
        return <div>
            {
                data && data.items && data.items.sort((a, b) => a.popularity < b.popularity ? 1 : -1).map(item => {
                    return <TrackCard data={item}></TrackCard>
                })
            }
        </div>
    }

}