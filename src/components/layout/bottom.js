import React from 'react'
import LoveIcon from '@material-ui/icons/Favorite'
import CopyrightIcon from '@material-ui/icons/Copyright'
import ULink from '../utils/link-without-underline'
import Typography from '@material-ui/core/Typography';
import _ from 'lodash'

function isChineseChar(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}

const WIKI = (props) => <a href={`https://${props.lang}.wikipedia.org/wiki/${props.title}`} target='__blank'>{props.title}</a>

const Aphorisms = (props) => {
    const { data } = props
    const { person, content, source } = data ? data[_.random(data.length - 1)] : {}

    const getRender = (person, content, source) => {
        if (content && source) {
            let personLang = isChineseChar(person) ? 'zh' : 'en'
            let sourceLang = isChineseChar(source) ? 'zh' : 'en'
            return <div>
                {content} —— {!!person && <WIKI lang={personLang} title={person} />} 《<WIKI lang={sourceLang} title={source} />》
                </div>
        }
    }
    return <Typography variant="subtitle1">
        {
            getRender(person, content, source)
        }
    </Typography>

}


export default (props) => (
    <div style={{ margin: `1em 0 auto auto`, textAlign: 'center', paddingBottom: '1em' }}>
        {props.siteConfig.aphorismsOpen && <Aphorisms data={props.allAphorisms} />}
        <Typography variant="subtitle1">
            Build with <ULink href="https://www.gatsbyjs.org" text="gatsby" />,
        <ULink href="https://reactjs.org" text="react" />,
        <ULink href="https://material-ui.com/"
                text="material-ui" /> and <LoveIcon
                color='primary'
                style={{ fontSize: '0.9em' }} />

            <span style={{ display: 'block' }}>
                Copyright 2019 <CopyrightIcon style={{ fontSize: '0.9em' }} /> <ULink
                    href={props.siteConfig.copyrightUrl} text={props.siteConfig.copyrightName} /> Powered by <ULink href="https://github.com/mayneyao/gine-blog" text="gine-blog" />
            </span>
        </Typography>

    </div>
)   
