import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import BookItem from '../components/book/bookItem'
import { graphql } from 'gatsby'
import notion from '../notion/api'

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    index: {
        margin: '0 auto',
    },
})

class Index extends React.Component {
    render() {
        const { classes, data: { allBook, allPost } } = this.props
        const { currentPage } = this.props.pageContext
        return (
            <Layout title="书单">
                <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1760px', margin: '0 auto' }}>
                    {
                        allBook.edges.map(item => {
                            let postsInfo = []
                            if (item.node.fk_blog) {
                                item.node.fk_blog.map(fkPost => {
                                    postsInfo = allPost.edges.filter(post => {
                                        let postID = post.node.slug.split('/')[1]
                                        return postID === notion.getBlockHashId(fkPost[1])
                                    })
                                })
                            }
                            return <BookItem data={{ postsInfo, ...item }} />
                        })
                    }
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
   query {
    allPost {
        edges {
          node {
            name
            slug
          }
        }
    }
    allBook {
      edges {
        node {
          slug
          created_time
          cover_image
          start
          status
          stars
          comment
          name
          tags
          fk_blog
        }
      }
    }
  }
  
`
