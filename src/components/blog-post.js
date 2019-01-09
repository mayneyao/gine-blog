import React from 'react'
import { graphql } from 'gatsby'
import Layout from './layout'
import withRoot from '../withRoot'
import Paper from './paper'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import ScrollProgress from './scroll-progress'


String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const colorImage = [
    "https://www.notion.so/images/page-cover/thumbs/solid_red.png",
    "https://www.notion.so/images/page-cover/thumbs/solid_yellow.png",
    "https://www.notion.so/images/page-cover/thumbs/solid_blue.png",
    "https://www.notion.so/images/page-cover/thumbs/solid_beige.png",
    "https://www.notion.so/images/page-cover/thumbs/gradients_8.png",
    "https://www.notion.so/images/page-cover/thumbs/gradients_4.png",
    "https://www.notion.so/images/page-cover/thumbs/gradients_2.png",
    "https://www.notion.so/images/page-cover/thumbs/gradients_11.jpg",
    "https://www.notion.so/images/page-cover/thumbs/gradients_10.jpg",
    "https://www.notion.so/images/page-cover/thumbs/gradients_5.png",
    "https://www.notion.so/images/page-cover/thumbs/gradients_3.png"
]

class BlogPost extends React.Component {

    componentDidMount() {
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

    render() {
        const { data } = this.props
        const post = data.markdownRemark
        console.log(post.fields.slug)
        return (
            <div>
                <ScrollProgress />
                <Layout>
                    <div style={{
                        width: '100%',
                        background: `url(${post.frontmatter.image || colorImage[`posts${post.fields.slug}`.charCodeAt() % 11]})`,
                        height: '400px',
                        backgroundSize: '100%',
                        backgroundPosition: 'bottom',
                    }} />
                    <main style={{
                        maxWidth: 900,
                        margin: '0 auto',
                        marginTop: -100,
                    }}>
                        <Paper>
                            <h1>{post.frontmatter.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
      }
      fields{
        slug
      }
    }
  }
`
