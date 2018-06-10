import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getAuthToken } from './services/auth'

const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cji3dr8th4tox0191volfuh45'
})

const authLink = setContext((_, { headers }) => {
  const authToken = getAuthToken()
  return {
    headers: {
      ...headers,
      Authorization: authToken ? `Bearer ${authToken}` : ''
    }
  }
})

const combinedLink = httpLink.concat(authLink)

const client = new ApolloClient({
  link: combinedLink,
  cache: new InMemoryCache()
})

export default client
