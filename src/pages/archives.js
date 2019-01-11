import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const styles = theme => ({
    index: {
        margin: '0 auto',
        maxWidth: 300,
        marginTop: '3em',
    },
})

class Tags extends React.Component {
    render () {
        const {classes, data: {allMarkdownRemark: {edges}}} = this.props

        let allPosts = {}
        let allYears = new Set()
        edges.forEach(
            ({node}) => {
                let [year, month, day] = node.frontmatter.date.split('/')
                allYears.add(year)
                if (!Boolean(allPosts[year])) {
                    allPosts[year] = []
                }
                allPosts[year].push(node)
            })
        return (
            <Layout>
                <div className={classes.index}>
                    {
                        Array.from(allYears).map(year => {
                            return <div>
                                <h3>{year}</h3>
                                {
                                    allPosts[year].map(post =>
                                        <li>
                                            <Link
                                                to={`posts${post.fields.slug}`}>{post.frontmatter.title}</Link>
                                        </li>,
                                    )
                                }
                            </div>
                        })
                    }
                </div>
            </Layout>
        )
    }
}

Tags.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Tags))

export const query = graphql`
{
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        frontmatter {
          date
          title
        }
        fields {
          slug
        }
      }
    }
  }
}
`
