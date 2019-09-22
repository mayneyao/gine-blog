import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../../withRoot'
import Layout from '../layout/index'
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
                    {data.allPosts.edges.map(({ node }) => (
                        <PostListItem title={node.name}
                            key={node.id}
                            content={node.name}
                            slug={node.slug}
                            format={node.pformat}
                            tags={node.tags}
                            date={node.public_date}
                        />
                    ))}
                    <Pagination totalCount={data.allPosts.totalCount}
                        pageSize={data.siteConfig.pageSize}
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
    siteConfig {  
      pageSize
  }
  allPosts(skip: $skip, limit: $limit,sort: { fields: [public_date], order: DESC },filter: {status: {eq: "published"}}) {
    edges{
      node{
        id
        name
        tags
        public_date
        slug
      }
    }
    totalCount
  }
}
`
