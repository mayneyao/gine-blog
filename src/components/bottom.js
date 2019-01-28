import React from 'react'
import LoveIcon from '@material-ui/icons/Favorite'
import CopyrightIcon from '@material-ui/icons/Copyright'
import ULink from './link-without-underline'
import axios from 'axios'
import Typography from '@material-ui/core/Typography';

function isChineseChar(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}



const WIKI = (props) => <a href={`https://${props.lang}.wikipedia.org/wiki/${props.title}`} target='__blank'>{props.title}</a>

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
        axios.get('https://api.gine.me/notion/b23848d867974c36a2902ec4cb833453/29915c889d4c415cbfb9e9bf7dd49afd?random_one=1').then(res => {
            this.setState({
                ...res.data
            })
        })
    }
    render() {
        const { person, content, source } = this.state

        const getRender = (person, content, source) => {
            if (person && content && source) {
                let personLang = isChineseChar(person) ? 'zh' : 'en'
                let sourceLang = isChineseChar(source) ? 'zh' : 'en'
                return <div>
                    {content} —— <WIKI lang={personLang} title={person} /> 《<WIKI lang={sourceLang} title={source} />》
                </div>
            }
        }
        return <Typography variant="subtitle1">
            {
                getRender(person, content, source)
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
