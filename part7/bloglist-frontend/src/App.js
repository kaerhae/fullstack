import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UsersView from './components/UserView.js'
import { setNotification } from './reducers/NotificationReducer'
import { setUser } from './reducers/UserReducer'
import { connect, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/BlogReducer'
import './App.css'
import BlogForm from './components/BlogForm'
import { initUsers } from './reducers/UsersReducer'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import Menu from './components/Menu'


const App = (props) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    props.setUser('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('LoggedInBlogAppUser', JSON.stringify(user))
      console.log('User = ', JSON.stringify(user))
      props.setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log('Ei')
      props.setNotification('Wrong Username or Password', 5)
    }
  }

  const userById = (id) =>
    props.users.find(b => b.id === id)

  const blogById = (id) =>
    props.blogs.find(b => b.id === id)

  return (
    <Container>
      <div className="App">
        <Notification />
        {!props.user ?
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          /> :
          <div>
            <Router>
              <Menu
                user={props.user}
                handleLogout={handleLogout}
              />
              <Switch>
                <Route exact path="/">
                  <BlogForm />
                  {props.blogs.map(blog =>
                    <Blog
                      key={blog.id}
                      blog={blog}
                      user={props.user}
                    />
                  )}
                </Route>
                <Route path="/blogs/:id">
                  <SingleBlog
                    blogById={blogById}
                  />
                </Route>
                <Route path="/users/:id">
                  <User
                    userById={userById}
                  />
                </Route>
                <Route path="/users">
                  <UsersView />
                </Route>
              </Switch>
            </Router>
          </div>
        }
      </div>
    </Container>
  )
}

const mapDispatchToProps = {
  setNotification,
  setUser
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)