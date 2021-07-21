import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/NotificationReducer'
import { connect, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/BlogReducer'
import './App.css'


const App = (props) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser] = useState(null)
  const [ loginVisible, setLoginVisible ] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('LoggedInBlogAppUser', JSON.stringify(user))
      console.log('User = ', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log('Ei')
      props.setNotification('Wrong Username or Password', 5)
    }
  }


  const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button className="create-button" onClick={() => setLoginVisible(true)}>Create New Blog</button>
        </div>
        <div style={showWhenVisible}>
          <AddBlog
            setLoginVisible={setLoginVisible}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Notification />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          loginVisible={loginVisible}
        /> :
        <div>
          <h2>Blogs</h2>
          <p>
            Logged in as {user.name}
            <button id='logout-button' className="log-button" onClick={handleLogout}>Logout</button>
          </p>

          {blogForm()}
          <Blog
            user={user}
          />
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = {
  setNotification
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)