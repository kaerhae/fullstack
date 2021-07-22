import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Menu = (props) => {


  return (
    <AppBar position="static" style={{ background: 'black' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <div style={{ marginLeft: 'auto' }}>
          <em >{props.user.name} <Button color="inherit" onClick={props.handleLogout}>Logout</Button></em>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Menu