import React from 'react'
import { graphql } from 'gatsby'
import Layout from './layout'
import withRoot from '../withRoot'
import Paper from './paper'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import ScrollProgress from './scroll-progress'
import ColorfulTag from './hash-colorful-tag'
import getImageByName from '../utils/notion-hash-image'
import Disqus from 'disqus-react';
import { Helmet } from "react-helmet"
import config from '../../config'


class BlogPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disqusShortname: undefined,
            disqusConfig: undefined
        }
    }

    componentDidMount() {
        const { data } = this.props
        const post = data.post
        const { disqusShortname } = config.comment.disqus;
        const disqusConfig = {
            url: window.location.href,
            identifier: window.location.pathname,
            title: post.name,
        }
        this.setState({
            disqusShortname,
            disqusConfig
        })
    }

    render() {
        const { data } = this.props
        const post = data.post
        const { public_date,
            update_time,
            name,
            tags,
            html,
            slug,
            keywords
        } = post
        const { disqusShortname, disqusConfig } = this.state
        const seoKeywords = keywords ? keywords.join(" ") : ''
        return (
            <div>
                <ScrollProgress />
                <Layout>
                    <img style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover'
                    }} src={post.image || getImageByName(slug)} />
                    <Helmet defaultTitle={`${config.blogMeta.title} - ${name}`}>
                        <meta name="description" content={`${seoKeywords} ${name} mayne gine 博客 python react`} />
                    </Helmet>
                    <main style={{
                        maxWidth: 900,
                        margin: '0 auto',
                        marginTop: -100,
                        marginBottom: 100,
                        position: 'sticky',
                    }}>
                        <div role='meta' style={{ display: 'flex' }}>
                            <div style={{
                                background: '#eee',
                                color: '#000',
                                display: 'flex',
                                alignItems: 'center',
                                flexShrink: 0,
                                height: '24px',
                                borderRadius: '3px',
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                fontSize: '14px',
                                lineHeight: '120%',
                                fontWeight: '400',
                                margin: '0px 6px 6px 0px',
                            }}>{public_date}</div>
                            {
                                tags && tags.map(
                                    tag => <ColorfulTag tag={tag} key={tag} />)
                            }
                        </div>
                        <Paper>
                            <h1>{name}</h1>
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                            {
                                (config.comment.open && disqusShortname && disqusConfig) && <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                            }

                        </Paper>
                    </main>
                </Layout>
            </div>
        )
    }

}

export default withRoot(BlogPost)

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug } ) {
        public_date
        update_time
        name
        tags
        html
        slug
        keywords
    }
  }
`
