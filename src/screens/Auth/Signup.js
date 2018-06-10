import React from 'react'
import gql from 'graphql-tag'

import { setAuthToken } from '../../services/auth'
import MutationForm from '../../components/MutationForm'

//gql-------------------------------------

const SIGNUP = gql`
  mutation (
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

//styled----------------------------------

//enhance---------------------------------

//component-----------------------------------

const inputs = [
  { type: 'text', name: 'name', required: true },
  { type: 'text', name: 'email', required: true },
  { type: 'password', name: 'password', required: true },
  { type: 'submit', value: 'Sign Up' }
]

const onCompleted = data => {
  const token = data.signupUser.token
  setAuthToken(token)
  window.alert(token)
}

const Signup = () => {
  return (
    <MutationForm
      mutation={SIGNUP}
      inputs={inputs}
      onCompleted={onCompleted}
    />
  )
}

export default Signup
