import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { setContext } from 'apollo-link-context'
import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client' 

const authLink = setContext((_, { headers }) => {
  const loggedUserJSON = window.localStorage.getItem('phonenumbers-user-token')
  const loggedUser = JSON.parse(loggedUserJSON)
  return {
    headers: {
      ...headers,
      authorization: loggedUser ? `bearer ${loggedUser.token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)