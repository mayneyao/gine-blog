import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import Paper from '../components/paper'


const styles = theme => ({
    index: {
        margin: '0 auto',
        maxWidth: 800,
        marginTop: '1em',
    },
})

class Tags extends React.Component {
    render() {
        const { classes, data: { allMarkdownRemark: { edges } } } = this.props

        let allPosts = {}
        let allYears = new Set()
        edges.forEach(
            ({ node }) => {
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
                    <Paper>
                        {
                            Array.from(allYears).map(year => {
                                return <div>
                                    <Typography variant="h4">{year}</Typography>
                                    <ul style={{ paddingLeft: '1em' }}>
                                        {
                                            allPosts[year].map(post => {
                                                let [year, month, day] = post.frontmatter.date.split('/')
                                                return <li style={{
                                                    listStyle: 'none',
                                                    borderLeft: '2px solid #999',
                                                    padding: '5px 0 5px 1em'
                                                }}>
                                                    <Typography variant="h6">{`${month}-${day} `}<Link to={`posts${post.fields.slug}`}>{post.frontmatter.title}</Link></Typography>
                                                </li>

                                            })
                                        }
                                    </ul>

                                </div>
                            })
                        }
                    </Paper>

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
