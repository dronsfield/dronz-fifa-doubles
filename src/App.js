import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import apolloClient from './apollo'

import theme from './theme'
import Router from './Router'

console.warn = () => {}

const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </ApolloProvider>
)

export default App
