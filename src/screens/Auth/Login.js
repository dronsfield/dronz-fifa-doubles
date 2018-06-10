import React from 'react'
import gql from 'graphql-tag'

import { setAuthToken } from '../../services/auth'
import MutationForm from '../../components/MutationForm'

//gql-------------------------------------

const LOGIN = gql`
  mutation (
    $email: String!
    $password: String!
  ) {
    authenticateUser(
      email: $email
      password: $password
    ) {
      token
    }
  }
`

//styled----------------------------------

//enhance---------------------------------

//component-------------------------------

const inputs = [
  { type: 'text', name: 'email', required: true },
  { type: 'password', name: 'password', required: true },
  { type: 'submit', value: 'Login' }
]

const onCompleted = data => {
  const token = data.authenticateUser.token
  setAuthToken(token)
  window.alert(token)
}

const Login = () => {
  return (
    <MutationForm
      mutation={LOGIN}
      inputs={inputs}
      onCompleted={onCompleted}
    />
  )
}

export default Login
