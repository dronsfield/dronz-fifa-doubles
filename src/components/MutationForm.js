import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { compose, withState, withHandlers, withPropsOnChange, pure } from 'recompose'
import { Mutation } from 'react-apollo'

import { getFormData } from '../helpers'

//gql-------------------------------------

//styled----------------------------------

//enhance---------------------------------

const enhance = compose(
  withState('errorMessage', 'setErrorMessage', ''),
  withHandlers({
    onSubmit: ({ mutate, setErrorMessage }) => e => {
      const onInvalid = (value, name) => setErrorMessage(`${name} required`)
      const variables = getFormData(e, null, onInvalid)

      if (variables) {
        mutate({ variables })
      }
    }
  })
)

//component-----------------------------------

let TheForm = props => {
  const { onSubmit, errorMessage, inputs } = props

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        {inputs.map((inputProps, i) => (
          <div key={i}>
            <input {...inputProps} />
          </div>
        ))}
      </form>
      <div>{errorMessage}</div>
    </React.Fragment>
  )
}
TheForm = enhance(TheForm)

const MutationForm = props => {
  const { inputs, onCompleted, mutation } = props
  return (
    <Mutation mutation={mutation} onCompleted={onCompleted}>
      {(mutate, { loading, error }) => {
        if (loading) return <div>Signing up...</div>
        if (error) {
          console.log(error)
          return <div>Something went wrong :(</div>
        }

        return <TheForm mutate={mutate} inputs={inputs} />
      }}
    </Mutation>
  )
}

export default MutationForm