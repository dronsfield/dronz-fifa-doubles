import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'

import enhance from './enhance'
import {
  Container,
  Bar
} from './styled'


const Root = props => {
  const {
    setItemSelections,
    itemSelections,
    onSubmitSearch,
    _addItem,
    _removeItem
  } = props
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div>/// CODING IN PROGRESS ///</div>
      </Container>
    </ThemeProvider>
  )
}

export default enhance(Root)