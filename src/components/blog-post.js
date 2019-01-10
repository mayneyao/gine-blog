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

class BlogPost extends React.Component {

    componentDidMount () {
        // let disqus_config = function () {
        //     this.page.url = window.location.href  // Replace PAGE_URL with your page's canonical URL variable
        //     this.page.identifier = window.location.pathname // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        // }
        //
        // let d = document, s = d.createElement('script')
        // s.src = 'https://maynes-blog.disqus.com/embed.js'
        // s.setAttribute('data-timestamp', +new Date());
        // (d.head || d.body).appendChild(s)
    }

    render () {
        const {data} = this.props
        const post = data.markdownRemark
        console.log(post.fields.slug)
        const {tags} = post.frontmatter
        return (
            <div>
                <ScrollProgress/>
                <Layout>
                    <div style={{
                        width: '100%',
                        background: `url(${post.frontmatter.image ||
                        getImageByName(`posts${post.fields.slug}`)})`,
                        height: '400px',
                        backgroundSize: '100%',
                        backgroundPosition: 'bottom',
                    }}/>
                    <main style={{
                        maxWidth: 900,
                        margin: '0 auto',
                        marginTop: -100,
                        marginBottom: 100,
                    }}>
                        <div role='meta' style={{display: 'flex'}}>
                            {
                                tags && tags.map(
                                    tag => <ColorfulTag tag={tag}/>)
                            }
                        </div>
                        <Paper>
                            <h1>{post.frontmatter.title}</h1>
                            <div dangerouslySetInnerHTML={{__html: post.html}}/>
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
        image
        tags
      }
      fields{
        slug
      }
    }
  }
`
