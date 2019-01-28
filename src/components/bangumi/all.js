import Axios from "axios"
import React from 'react'
import BangumiCard from './BangumiCard'
import { graphql } from 'gatsby'
import Layout from '../layout'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../../withRoot'


class AllBangumi extends React.Component {
    render() {

        const { data, classes } = this.props
        console.log(this.props)
        return <Layout>
            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 1100, margin: '0 auto' }}>
                {
                    data.allBangumi.edges.sort((a, b) => parseInt(a.node.season_id) < parseInt(b.node.season_id) ? 1 : -1 ).map(item => {
                        return <BangumiCard data={item.node} key={item.node.id}></BangumiCard>
                    })
                }
            </div>
        </Layout>

    }

}
export default withRoot(AllBangumi)

export const query = graphql`
{
    allBangumi{
      edges{
        node{
          season_id
          cover
          share_url
          title
          brief
          is_finish
        }
      }
    }
  }  
`
