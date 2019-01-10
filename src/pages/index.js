import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import PostListItem from '../components/post-list-item'

const PAGESIZE = 5

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    index: {
        margin: '0 auto',
        maxWidth: 800,
        marginTop: '3em',
    },
})

class Index extends React.Component {
    render () {
        const {classes, data} = this.props

        return (
            <Layout>
                <div className={classes.index}>
                    {/*<h4>{data.allMarkdownRemark.totalCount} Posts</h4>*/}
                    {data.allMarkdownRemark.edges.map(({node}) => (
                        <PostListItem title={node.frontmatter.title}
                                      key={node.id}
                                      content={node.excerpt}
                                      slug={`posts${node.fields.slug}`}
                                      image={node.frontmatter.image}
                                      tags={node.frontmatter.tags}
                        />
                    ))}
                </div>
            </Layout>
        )
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Index))

export const query = graphql`
  {
  allMarkdownRemark {
    edges{
      node{
        id
        frontmatter{
          title
          image
          tags
        }
        excerpt
        wordCount {
          paragraphs
          sentences
          words
        }
        fields {
          slug
        }
      }
    }
    totalCount
  }
}
`
