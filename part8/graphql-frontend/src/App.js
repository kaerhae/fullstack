import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useApolloClient, useMutation, useLazyQuery, useQuery, useSubscription } from '@apollo/client'
import Book from './components/Book'
import Author from './components/Author'
import Menu from './components/Menu'
import AddBook from './components/AddBook'
import Alert from '@material-ui/lab/Alert';
import { ALL_AUTHORS, LOGIN, ALL_GENRES, BOOK_ADDED, ALL_BOOKS } from './queries'
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
  const [ books, setBooks ] = useState('')

  const [ filterValue, setFilterValue ] = useState('')

  const [getBook, bookResult] = useLazyQuery(ALL_BOOKS)


  useEffect(() => {
    if(!filterValue) {
      getBook()
    }
  }, [filterValue, getBook])

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks)
    }  
  }, [bookResult])
  


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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      setMessage(`${addedBook.title} by ${addedBook.author.name} added to library!`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      updateCacheWith(addedBook)
    }
  })

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

  const handleOnChange = filterValue => {
    setFilterValue(filterValue.value)
  }

  const submitSelect = (e) => {
    e.preventDefault()
    if (filterValue === 'all') {
      getBook()
    } else {
      getBook({ variables: { genre: filterValue }})
    }

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
                  genres={genreResult.data.allBooks}
                  books={books}
                  submitSelect={submitSelect}
                  handleOnChange={handleOnChange}
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
                   books={books}
                />
              </Route>
          </Switch>
        </Router>

  )
}

export default App