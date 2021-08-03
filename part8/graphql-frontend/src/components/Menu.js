import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ user, logout }) => {


  return (
    <AppBar position="static" style={{ background: 'black' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button style={{ marginLeft: '50px' }} color="inherit" component={Link} to="/authors">
          Authors
        </Button>
        <Button style={{ marginLeft: '50px' }} color="inherit" component={Link} to="/books">
          Books
        </Button>
        {
          user ?
          <div>
            <Button style={{ marginLeft: '50px' }} color="inherit" component={Link} to="/recommended">
              Recommended books
            </Button>
            <Button style={{ marginLeft: '50px' }} color="inherit" component={Link} to="/addBook">
              Add Book
            </Button>
            <Button style={{ marginLeft: '50px' }} color="inherit" onClick={logout}>
              Logout
            </Button>
            <em style={{ marginLeft: '45px' }}>{user.username}</em>
          </div>
          : <Button style={{ marginLeft: '50px' }} color="inherit" component={Link} to="/login">
          Login
        </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Menu