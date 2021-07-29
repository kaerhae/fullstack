import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Typography,
} from '@material-ui/core'
import AddYear from './AddYear'

const Author = ({ authors }) => {

  return (
    <div>
      <Typography variant="h2" gutterBottom>Authors</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Author Name</b>
              </TableCell>
              <TableCell>
                <b>Born</b>
              </TableCell>
              <TableCell>
                <b>Number of books published</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              authors.map(a =>
                <TableRow key={a.name}>
                  <TableCell>
                    {a.name}
                  </TableCell>
                  <TableCell>
                    {a.born}
                  </TableCell>
                  <TableCell>
                    {a.bookCount}
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <AddYear authors={authors} />
    </div>
  )
}

export default Author