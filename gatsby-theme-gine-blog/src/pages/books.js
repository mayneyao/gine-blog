import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout/index'
import BookItem from '../components/book/bookItem'
import { graphql } from 'gatsby'

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
        const { classes, data: { allBooks, allPosts } } = this.props
        const { currentPage } = this.props.pageContext
        return (
            <Layout title="书单">
                <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1760px', margin: '0 auto' }}>
                    {
                        allBooks.edges.map(item => {
                            let postsInfo = item.node.posts
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
    allPosts {
        edges {
          node {
            name
            slug
          }
        }
    }
    allBooks {
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
          posts{
            slug
            name
          }
        }
      }
    }
  }
`
