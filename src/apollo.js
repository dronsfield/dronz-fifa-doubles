import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getAuthToken } from './services/auth'

const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cji3dr8th4tox0191volfuh45'
})

const authLink = (operation, forward) => {
  const authToken = getAuthToken()

  operation.setContext(context => ({
    ...context,
    headers: {
      ...context.headers,
      Authorization: authToken ? `Bearer ${authToken}` : '',
      Foo: 'Bar'
    }
  }))
  
  return forward(operation)
}

const link = ApolloLink.from([
  authLink,
  httpLink
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
