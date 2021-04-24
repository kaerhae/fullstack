import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import './App.css'
import BlogDisplay from './components/BlogForm'


const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser] = useState(null)
  const [ loginVisible, setLoginVisible ] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
        .then(r => {
          setBlogs(blogs.concat(r))
          setTitle('')
          setUrl('')
          setAuthor('')
          setMessage('A new blog added!')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

        setLoginVisible(false)
  }

  const loginForm = () => {
    return (
    <div className="App">
        <h2>Log in to Application</h2>
        <form onSubmit={handleLogin}>
          <div>Username 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>Password 
            <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} 
            />
            </div>
            <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  const TogglableBlog = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
    <div className="App">
        <div>
          <button onClick={() => setLoginVisible(true)}>New Blog</button>
        </div>
        <div >
            <BlogDisplay 
              handleLogout={handleLogout}
              handleSubmit={handleSubmit}
              title={title}
              url={url}
              author={author}
              titleOnChange={({ target }) => setTitle(target.value)} 
              authorOnChange={({ target }) => setAuthor(target.value)}
              urlOnChange={({ target }) => setUrl(target.value)}
              />
        <button onClick={() => setLoginVisible(false)}>Cancel</button>

      </div>
    </div>
    )}

 
      
      
     
  


  return (
    <div className="App">
    <Notification message={message}/>

    {user === null ?
      loginForm() :
      <div>
      <h2>Blogs</h2>
          <p>
            Logged in as {user.name}      
            <button onClick={handleLogout}>Logout</button>
          </p>
     <TogglableBlog />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    
    }

    </div>
  )
}

export default App