import React from 'react'
import { compose, withState, withHandlers, withPropsOnChange, pure } from 'recompose'
import { Route, Redirect } from 'react-router-dom'

import { getAuthToken } from '../services/auth'

//gql-------------------------------------

//styled----------------------------------

//enhance---------------------------------

const enhance = compose(
  withPropsOnChange(
    ['component'],
    ({ component: Component }) => {
      const render = (props) => {
        const token = getAuthToken()
        return (
          token
          ? <Component {...props} />
          : <Redirect to='/login' />
        )
      }
      return { render }
    }
  )
)

//component-----------------------------------

const PrivateRoute = props => {
  const { component, render, ...rest } = props
  return <Route {...rest} render={render} />
}

export default enhance(PrivateRoute)
