import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/NotificationReducer'
import { setUser } from './reducers/UserReducer'
import { connect, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/BlogReducer'
import './App.css'
import BlogForm from './components/BlogForm'


const App = (props) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
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


  return (
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
          <h2>Blogs</h2>
          <p>
            Logged in as {props.user.name}
            <button id='logout-button' className="log-button" onClick={handleLogout}>Logout</button>
          </p>

          <BlogForm />
          {props.blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={props.user}
            />
          )}
        </div>
      }
    </div>
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
    user: state.user
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)