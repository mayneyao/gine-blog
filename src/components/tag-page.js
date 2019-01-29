import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import PostListItem from '../components/post-list-item'
import ColorfulTag from './hash-colorful-tag'
import { graphql } from 'gatsby'

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
    render() {
        const { classes, data } = this.props
        const { tag } = this.props.pageContext
        return (
            <Layout>
                <div className={classes.index}>
                    <div style={{ display: 'flex' }}>
                        <span>共有{data.allPost.totalCount}篇关于 </span> <ColorfulTag tag={tag} /> <span>的文章</span>
                    </div>

                    {data.allPost.edges.map(({ node }) => (
                        <PostListItem title={node.name}
                            key={node.id}
                            content={node.brief}
                            slug={node.slug}
                            image={node.image}
                            tags={node.tags}
                            date={node.public_date}
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
query ($tag: String!){
    allPost(filter:{tags: {in: [$tag]}},sort: { fields: [public_date], order: DESC }) {
        edges{
          node{
            id
            name
            tags
            public_date
            slug
            brief
          }
        }
        totalCount
      }
  }
`