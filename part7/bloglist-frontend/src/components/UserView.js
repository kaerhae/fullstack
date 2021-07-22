import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
const UsersView = (props) => {

  return (
    <div>
      <h2>Users</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {props.users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}



export default connect(
  mapStateToProps
)(UsersView)
