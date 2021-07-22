import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
const LoginForm = (props) => {

  return (
    <div className="App">
      <h2>Log in to Application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          <TextField
            label="Username"
            id="username"
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label='Password'
            id="password"
            type="password"
            value={props.password}
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <Button style={{ background:'black', color:'white', margin: '10px' }} id="login-button" type="submit">Login</Button>
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