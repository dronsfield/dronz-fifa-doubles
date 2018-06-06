import gql from 'graphql-tag'

export const SIGNUP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signupUser(
      email: $email
      password: $password
      name: $name
    ) {
      id
      token
    }
  }
`
