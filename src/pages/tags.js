import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import countBy from 'lodash/countBy'
import ColorfulTag from '../components/hash-colorful-tag'

const styles = theme => ({
    index: {
        margin: '0 auto',
        maxWidth: 100,
        marginTop: '3em',
        textAlign: 'center',
    },
})

class Tags extends React.Component {
    render () {
        const {classes, data: {allMarkdownRemark: {edges}}} = this.props
        let allTags = []
        edges.forEach(
            ({node}) => allTags = allTags.concat(node.frontmatter.tags))
        const countTags = countBy(allTags)
        return (
            <Layout>
                <div className={classes.index}>
                    {Object.entries(countTags).map(([tag, count]) => {
                        return <div style={{display: 'flex'}} key={tag}>
                            <ColorfulTag tag={tag}/>{count}
                        </div>
                    })}
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
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          tags
        }
      }
    }
  }
}
`
