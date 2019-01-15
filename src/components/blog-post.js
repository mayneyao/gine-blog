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
        const post = data.markdownRemark
        const disqusShortname = 'maynes-blog';
        const disqusConfig = {
            url: window.location.href,
            identifier: window.location.pathname,
            title: post.frontmatter.title,
        }
        this.setState({
            disqusShortname,
            disqusConfig
        })
    }

    render() {
        const { data } = this.props
        const post = data.markdownRemark
        const { tags, date } = post.frontmatter
        const { disqusShortname, disqusConfig } = this.state

        return (
            <div>
                <ScrollProgress />
                <Layout>
                    <div style={{
                        width: '100%',
                        background: `url(${post.frontmatter.image || getImageByName(post.fields.slug)}`,
                        height: '400px',
                        backgroundSize: '100%',
                        backgroundPosition: 'bottom',
                    }} />
                    <main style={{
                        maxWidth: 900,
                        margin: '0 auto',
                        marginTop: -100,
                        marginBottom: 100,
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
                            }}>{date}</div>
                            {
                                tags && tags.map(
                                    tag => <ColorfulTag tag={tag} key={tag} />)
                            }
                        </div>
                        <Paper>
                            <h1>{post.frontmatter.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: post.html }} />
                            {
                                (disqusShortname && disqusConfig) && <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        date
      }
      fields{
        slug
      }
    }
  }
`
