import Axios from "axios"

import React from 'react'
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied"
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied"
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied"
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied"
import Paper from '@material-ui/core/Paper';
import { Helmet } from "react-helmet"
import Layout from '../layout'
import TrackCard from './TrackCard'
import max from 'lodash/max'
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../../../config'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            happinessIndex: 0,
            maxWidth: 0,
            maxTrackPopularity: 0,
            loading: true
        }
    }


    computeHappy = (data) => {
        let allTrackPopularity = data.items.map(item => item.popularity).reduce((a, b) => a + b)
        let allValence = data.audio_features.map(item => {
            let itemPopularity = data.items.find(t => t.id === item.id).popularity / allTrackPopularity
            return item.valence * itemPopularity
        })

        let happinessIndex = allValence.reduce((a, b) => a + b)
        return happinessIndex
    }

    componentDidMount() {
        let maxWidth = document.getElementById('MyTopMusic').offsetWidth

        Axios.get(config.music.url).then(res => {
            let maxTrackPopularity = max(res.data.items.map(item => item.popularity))
            this.setState({
                data: res.data,
                maxWidth,
                maxTrackPopularity,
                happinessIndex: this.computeHappy(res.data),
                loading: false
            })
        })
    }

    render() {
        const { data, happinessIndex, maxWidth, maxTrackPopularity, loading } = this.state
        return <Layout>
            <Helmet defaultTitle={`近期Top20Music&状态分析 - ${config.blogMeta.title}`}>
                <meta name="description" content={`${config.blogMeta.title} 博客 python react gine music 音乐`} />
            </Helmet>
            <Paper style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 850, margin: '0 auto', marginTop: 10 }} id='MyTopMusic'>
                <div>
                    {
                        data && data.items && data.items.sort((a, b) => a.popularity < b.popularity ? 1 : -1).map(item => {
                            return <TrackCard data={item} width={maxWidth * item.popularity / maxTrackPopularity - 64} maxWidth={maxWidth - 64}></TrackCard>
                        })
                    }
                </div>
                <div style={{ maxWidth: 300, margin: '0 auto' }}>
                    <SentimentVeryDissatisfiedIcon color={happinessIndex >= 0 && happinessIndex < 0.25 ? 'secondary' : ''} style={{ fontSize: '3em' }} />
                    <SentimentDissatisfiedIcon color={happinessIndex >= 0.25 && happinessIndex < 0.5 ? 'secondary' : ''} style={{ fontSize: '3em' }} />
                    {
                        loading && <CircularProgress />
                    }
                    <SentimentSatisfiedIcon color={happinessIndex >= 0.5 && happinessIndex < 0.75 ? 'secondary' : ''} style={{ fontSize: '3em' }} />
                    <SentimentVerySatisfiedIcon color={happinessIndex >= 0.75 && happinessIndex < 1 ? 'secondary' : ''} style={{ fontSize: '3em' }} />
                </div>

            </Paper>
        </Layout>
    }

}