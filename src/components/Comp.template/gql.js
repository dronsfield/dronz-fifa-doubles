import gql from 'graphql-tag'

export const GET_SOMETHING = gql`
  query {
    someStuff {
      x
      y
    }
  }
`
