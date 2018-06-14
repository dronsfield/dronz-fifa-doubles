import React from 'react'
import { Query } from 'react-apollo'

import enhance from './enhance'
import { GET_ALL_MATCHES } from './gql'
import {
  Foo
} from './styled'

const AllMatches = props => {
  return (
    <Query query={GET_ALL_MATCHES}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error :(</div>

        console.log(data)

        return data.allMatches.map(match => {
          return <React.Fragment key={match.id}>
            <div>{match.homePlayer1.name}, {match.homePlayer2.name}: {match.homeScore}</div>
            <div>{match.awayPlayer1.name}, {match.awayPlayer2.name}: {match.awayScore}</div>
          </React.Fragment>
        })
      }}
    </Query>
  )
}

export default enhance(AllMatches)