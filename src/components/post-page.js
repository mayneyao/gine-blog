import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import PostListItem from '../components/post-list-item'
import Pagination from './pagination'

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
        const currentPage = parseInt(window.location.pathname.split('/')[2])
        return (
            <Layout>
                <div className={classes.index}>
                    {data.allMarkdownRemark.edges.map(({node}) => (
                        <PostListItem title={node.frontmatter.title}
                                      key={node.id}
                                      content={node.excerpt}
                                      slug={`posts${node.fields.slug}`}
                                      image={node.frontmatter.image}
                                      tags={node.frontmatter.tags}
                        />
                    ))}
                    <Pagination totalCount={data.allMarkdownRemark.totalCount}
                                pageSize={data.site.siteMetadata.pageSize}
                                currentPage={currentPage}
                    />
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
   query ($skip: Int!, $limit: Int!)
  {
    site {
      siteMetadata {
        pageSize
    }
  }
  allMarkdownRemark(skip: $skip, limit: $limit) {
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
