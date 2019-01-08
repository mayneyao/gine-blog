import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import PostListItem from '../components/post-list-item'

const PageSize = 5

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    index: {
        margin: '0 auto',
        maxWidth: 900,
    },
})

class Index extends React.Component {
    state = {
        open: false,
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    handleClick = () => {
        this.setState({
            open: true,
        })
    }

    render () {
        const {classes, data} = this.props
        const {open} = this.state

        return (
            <Layout>
                <div className={classes.index}>
                    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
                    {data.allMarkdownRemark.edges.map(({node}) => (
                        <PostListItem title={node.frontmatter.title}
                                      key={node.id}
                                      content={node.excerpt}
                                      slug={`posts${node.fields.slug}`}/>
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
