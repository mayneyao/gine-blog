import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../../withRoot'
import Layout from '../layout'
import PostListItem from './post-list-item'
import Pagination from '../utils/pagination'
import { graphql } from 'gatsby'

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    index: {
        margin: '2px auto',
        maxWidth: 700,
    },
})

class Index extends React.Component {
    render() {
        const { classes, data } = this.props
        const { currentPage } = this.props.pageContext
        return (
            <Layout>
                <div className={classes.index}>
                    {data.allPost.edges.map(({ node }) => (
                        <PostListItem title={node.name}
                            key={node.id}
                            content={node.brief}
                            slug={node.slug}
                            format={node.pformat}
                            tags={node.tags}
                            date={node.public_date}
                        />
                    ))}
                    <Pagination totalCount={data.allPost.totalCount}
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
  allPost(skip: $skip, limit: $limit,sort: { fields: [public_date], order: DESC }) {
    edges{
      node{
        id
        name
        tags
        public_date
        slug
        brief
        pformat{
            page_cover
        }
      }
    }
    totalCount
  }
}
`
