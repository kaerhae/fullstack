import React from 'react'
import { TextField, Button, Container, Typography } from '@material-ui/core'

const LoginForm = (props) => {

  return (
    <Container style={{ textAlign:'center', marginTop: '10%'}}>
      <Typography variant="h5">Login in to Application</Typography>
      <form onSubmit={props.handleLogin}>
        <div>
          <TextField
            className="login-inputfield"
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
            className="login-inputfield"
            label='Password'
            id="password"
            type="password"
            value={props.password}
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <Button style={{ background:'black', color:'white', margin: '10px' }} id="login-button" type="submit">Login</Button>
      </form>
    </Container>
  )
}

export default LoginForm