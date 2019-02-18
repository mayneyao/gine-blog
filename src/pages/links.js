import Axios from "axios"
import React from 'react'
import LinkCard from '../components/LinkCard'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'


class AllLink extends React.Component {
    render() {

        const { data, classes } = this.props
        console.log(this.props)
        return <Layout>
            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 450, margin: '0 auto' }}>
                {
                    data.allLink.edges.map(item => {
                        return <LinkCard data={item.node} key={item.node.id}></LinkCard>
                    })
                }
            </div>
        </Layout>

    }

}
export default withRoot(AllLink)

export const query = graphql`
{
    allLink {
      edges {
        node {
          name
          desc
          url
          icon
          id
        }
      }
      totalCount
    }
  }  
`
