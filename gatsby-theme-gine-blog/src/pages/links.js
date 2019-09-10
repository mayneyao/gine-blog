import React from 'react'
import LinkCard from '../components/link/LinkCard'
import { graphql } from "gatsby"
import Layout from '../components/layout/index'
import withRoot from '../withRoot'

class AllLink extends React.Component {
  render() {

    const { data, classes } = this.props
    return <Layout title="友链">
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 450, margin: '1em auto', marginTop: 42 }}>
        {
          data.allLinks.edges.map(item => {
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
  allLinks {
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

