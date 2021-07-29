import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Menu = (props) => {


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
        <Button style={{ marginLeft: '50px' }} color="inherit" component={Link} to="/addBook">
          Add Book
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu