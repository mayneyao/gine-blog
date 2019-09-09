import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'
import Layout from '../components/layout'
import countBy from 'lodash/countBy'
import ColorfulTag, { getHashColor } from '../components/utils/hash-colorful-tag'
import { graphql } from 'gatsby'
import Paper from '../components/utils/paper'
import PieChart from '../components/postTag/PieChart'

const styles = theme => ({
    index: {
        margin: '0 auto',
        maxWidth: 800,
        paddingTop: '1em',
        textAlign: 'center',
    },
})

class Tags extends React.Component {
    render() {
        const { classes, data: { allPosts: { edges } } } = this.props
        let allTags = []
        edges.forEach(
            ({ node }) => allTags = allTags.concat(node.tags))
        const countTags = countBy(allTags)
        const sourceData = Object.entries(countTags).map(([tag, count]) => {
            return { item: tag, count: count, color: getHashColor(tag), percent: count / Object.entries(countTags).length }
        })
        return (
            <Layout title="标签">
                <div className={classes.index}>
                    <Paper>
                        <PieChart sourceData={sourceData} />
                        {/* {Object.entries(countTags).map(([tag, count]) => {
                            return <div style={{ display: 'flex' }} key={tag}>
                                <ColorfulTag tag={tag} />{count}
                            </div>
                        })} */}
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
    allPosts{
    edges {
      node {
        tags
      }
    }
  }
}
`
