import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Book from './components/Book'
import Author from './components/Author'
import Menu from './components/Menu'
import AddBook from './components/AddBook'
import { ALL_BOOKS, ALL_AUTHORS } from './queries'
import './App.css'

const App = () => {
  const bookResult = useQuery(ALL_BOOKS)
  const authorResult = useQuery(ALL_AUTHORS)
  

  if (bookResult.loading || authorResult.loading)  {
    return <div>loading...</div>
  }

  return (
        <Router>
          <Menu />
          <Switch>
              <Route path="/books">
                <Book books = {bookResult.data.allBooks}/>
              </Route>
              <Route path="/authors">
                <Author 
                  authors = {authorResult.data.allAuthors}
                />
              </Route>
              <Route path="/addBook">
                <AddBook />
              </Route>
          </Switch>
        </Router>

  )
}

export default App