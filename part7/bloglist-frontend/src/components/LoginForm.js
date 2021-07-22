import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {

  return (
    <div className="App">
      <h2>Log in to Application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          Username
          <input
            id="username"
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id="password"
            type="password"
            value={props.password}
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired
}

export default LoginForm