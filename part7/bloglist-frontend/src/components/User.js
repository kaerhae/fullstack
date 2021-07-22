import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
const User = ({ userById }) => {
  const id = useParams().id
  const user = userById(id)
  console.log(user)
  if (!user) {
    <div>Fetching User Information...</div>
  }
  else {
    return (
      <div>
        <h1>{user.name}</h1>
        <h3>Blogs added</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {
                user.blogs.map(b =>
                  <TableRow key={b.id}>
                    <TableCell>
                      {b.title}
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

export default User