import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { compose, withState, withHandlers, withPropsOnChange, pure } from 'recompose'
import { Query } from 'react-apollo'

//gql-------------------------------------

const GET_ALL_MATCHES = gql`
  query {
    allMatches {
      id
      homeScore
      awayScore
      homePlayer1 {
        name
      }
      homePlayer2 {
        name
      }
      awayPlayer1 {
        name
      }
      awayPlayer2 {
        name
      }
    }
  }
`

//styled----------------------------------

//enhance---------------------------------

const enhance = compose()

//component-------------------------------

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
