import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import Book from './components/Book'
import Author from './components/Author'
import Menu from './components/Menu'
import AddBook from './components/AddBook'
import Alert from '@material-ui/lab/Alert';
import { ALL_BOOKS, ALL_AUTHORS, LOGIN, ALL_GENRES } from './queries'
import './App.css'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [ message, setMessage ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState('')
  const client = useApolloClient()
  const genreResult = useQuery(ALL_GENRES)
  const authorResult = useQuery(ALL_AUTHORS)
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
      setMessage(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('phonenumbers-user-token')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login
      const userObj = {
        username: token.user.username,
        id: token.user.id,
        favoriteGenre: token.user.favoriteGenre,
        token: token.token
      }
      setUser(userObj)
      localStorage.setItem('phonenumbers-user-token', JSON.stringify(userObj))
    }
  }, [result.data]) // eslint-disable-line

  if (authorResult.loading || genreResult.loading)  {
    return <div>loading...</div>
  }

  

  const handleLogin = async (e) => {
    e.preventDefault()
    setUsername('')
    setPassword('')
    login({ variables: { username, password }})
  }


  const logout = () => {
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!user) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    )
  }
  

  return (
        <Router>
          <Menu
            user={user}
            logout={logout}
          />
          {
            message ? <Alert severity="error">{message}</Alert> : null
          }
          <Switch>
              <Route path="/books">
                <Book
                  genres={genreResult.data.allGenres}
                />
              </Route>
              <Route path="/authors">
                <Author 
                  authors = {authorResult.data.allAuthors}
                  setMessage={setMessage}
                  user={user}
                />
              </Route>
              <Route path="/addBook">
                <AddBook
                  setMessage={setMessage}
                  user={user}
                />
              </Route>
              <Route path="/login">
                <LoginForm
                   username={username}
                   password={password}
                   handleLogin={handleLogin}
                   setUsername={setUsername}
                   setPassword={setPassword}
                />
              </Route>
              <Route path="/recommended">
                <Recommended
                   user={user}
                />
              </Route>
          </Switch>
        </Router>

  )
}

export default App