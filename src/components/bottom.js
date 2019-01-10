import React from 'react'
import LoveIcon from '@material-ui/icons/Favorite'
import CopyrightIcon from '@material-ui/icons/Copyright'
import ULink from './link-without-underline'
import axios from 'axios'
import Typography from '@material-ui/core/Typography';



class Aphorisms extends React.Component {

    constructor() {
        super()
        this.state = {
            person: '',
            content: '',
            source: ''
        }
    }

    componentDidMount() {
        axios.get('/aphorisms.json').then(res => {
            console.log(res)
            const data = res.data
            const aphorisms = data.edges[Math.floor(Math.random() * 10 % data.edges.length)]
            this.setState({
                ...aphorisms.node
            })
        })
    }
    render() {
        const { person, content, source } = this.state

        return <Typography variant="h6">
            {
                (person && content && source) && `${content} —— ${person} 《${source}》`
            }
        </Typography>
    }
}


export default () => (
    <div style={{ margin: `1em 0 auto auto`, textAlign: 'center', paddingBottom: '1em' }}>

        <Aphorisms />
        <Typography variant="subtitle1">
            Build with <ULink href="https://www.gatsbyjs.org" text="gatsby" />,
        <ULink href="https://reactjs.org" text="react" />,
        <ULink href="https://material-ui.com/"
                text="material-ui" /> and <LoveIcon
                color='primary'
                style={{ fontSize: '0.9em' }} />
            <span style={{ display: 'block' }}>
                Copyright 2019 <CopyrightIcon style={{ fontSize: '0.9em' }} /> <ULink
                    href="https://github.com/mayneyao" text="Mayne" />
            </span>

        </Typography>

    </div>
)   
