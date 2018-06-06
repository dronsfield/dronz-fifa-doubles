import React from 'react'
import { ApolloProvider } from 'react-apollo'

import apolloClient from './apollo'

import Router from './Router'

console.warn = () => {}

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router />
  </ApolloProvider>
)

export default App
