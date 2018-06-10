import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { compose, withState, withHandlers, withPropsOnChange, pure } from 'recompose'

//gql-------------------------------------

const LOGIN = gql`

`

//styled----------------------------------

const Foo = styled.div`

`

//enhance---------------------------------

const enhance = compose(

)

//component-------------------------------

const Comp = () => {
  return null
}

export default enhance(Comp)
