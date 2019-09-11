import React from 'react'
import withRoot from '../withRoot'
import DynamicPage from '../components/dynamicPage'
import moment from '../components/moment/moment'
import dayjs from 'dayjs'
import { graphql } from 'gatsby'

function Moments(props) {
    const style = {
        margin: '0 auto',
        maxWidth: 800,
        paddingTop: '10px'
    }
    const { sourceConfig } = props.data
    return (
        sourceConfig ? <DynamicPage
            style={style}
            url={sourceConfig.table}
            itemComponent={moment}
            sortFunc={(a, b) => dayjs(b.created_time) - dayjs(a.created_time)}
            title="动态"
        /> : <div>
                Can't find moments source table, check source config!
            </div>
    )
}

export default withRoot(Moments)

export const query = graphql`
   query {
    sourceConfig(name: {eq: "moments"}) {
        table
      }
  }
`
