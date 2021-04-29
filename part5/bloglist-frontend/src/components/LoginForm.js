import React, { useState } from 'react'

const LoginForm = ({ username, password, handleLogin, setPassword, setUsername }) => {
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

export default LoginForm