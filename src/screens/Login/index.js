import React from 'react'
import { Mutation } from 'react-apollo'

import enhance from './enhance'
import { SIGNUP } from './gql'
import {
  Foo
} from './styled'

let LoginForm = props => {
  const { onSubmit, errorMessage } = props

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='name'
          required
        />
        <input
          type='text'
          name='email'
          required
        />
        <input
          type='password'
          name='password'
          required
        />
        <input
          type='submit'
        />
      </form>
      <div>{errorMessage}</div>
    </React.Fragment>
  )
}
LoginForm = enhance(LoginForm)

const Login = props => {
  return (
    <Mutation mutation={SIGNUP}>
      {(signup, { loading, error }) => {
        if (loading) return <div>Signing up...</div>
        if (error) {
          console.log(error)
          return <div>Something went wrong :(</div>
        }

        return <LoginForm signup={signup} />
      }}
    </Mutation>
  )
}

export default Login