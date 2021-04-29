import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import LoginForm from './components/LoginForm'
import './App.css'


const App = () => {
  const [ blogs, setBlogs ] = useState([])
  
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ user, setUser] = useState(null)
  const [ loginVisible, setLoginVisible ] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortBlogs )
    })  
  }, [])

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

  const addBlog = async (newObject) => {
    try {
      const add = await blogService.create(newObject)
      setBlogs(blogs.concat(add))
      setMessage('New blog created!')
    } catch (e) {
      setMessage('Error: ', e)
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setLoginVisible(false)

  }
  

  const updateBlog = async (newObject, id) => {
    try {
      const update = await blogService.update(
        newObject, id
      )
      console.log(update)
      const newBlogs = blogs.map(b => b.id !== update.id ? b : update)
      const sortBlogs = newBlogs.sort((a, b) => b.likes - a.likes)

      setBlogs(sortBlogs)
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('LoggedInBlogAppUser', JSON.stringify(user))
      console.log("User = ", JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    } catch (exception) {
      console.log("Ei")
      setMessage('Wrong Username or Password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }


  const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Create New Blog</button>
        </div>
        <div style={showWhenVisible}>
        <AddBlog
            createBlog={addBlog} 
           /> 
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }


  return (
    <div className="App">
    <Notification message={message}/>

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
            <button className="log-button" onClick={handleLogout}>Logout</button>
          </p>

      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} updateBlog={updateBlog}/>
      )}
    </div>
    }
  </div>
  )
}

export default App