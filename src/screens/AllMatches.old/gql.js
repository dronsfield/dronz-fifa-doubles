import gql from 'graphql-tag'

export const GET_ALL_MATCHES = gql`
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
