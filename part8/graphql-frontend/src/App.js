import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { gql, useQuery, useMutation } from '@apollo/client'
import Book from './components/Book'
import Author from './components/Author'
import Menu from './components/Menu'
import AddBook from './components/AddBook'
import './App.css'

const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      published
      author
    }
  }
`

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const CREATE_BOOK = gql`
  mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title, 
    author: $author,
    published: $published, 
    genres: $genres
  ) {
    title
    published
    author
    genres
  }
}
`


const App = () => {
  const bookResult = useQuery(ALL_BOOKS)
  const authorResult = useQuery(ALL_AUTHORS)
  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS } ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  if (bookResult.loading || authorResult.loading)  {
    return <div>loading...</div>
  }

  return (
        <Router>
          <Menu />
          <Switch>
            <Container>
              <Route path="/books">
                <Book books = {bookResult.data.allBooks}/>
              </Route>
              <Route path="/authors">
                <Author authors = {authorResult.data.allAuthors} />
              </Route>
              <Route path="/addBook">
                <AddBook
                  createBook={createBook}
                />
              </Route>
            </Container>
          </Switch>
        </Router>

  )
}

export default App