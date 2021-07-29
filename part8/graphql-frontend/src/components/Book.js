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
const Book = ({ books }) => {
  return (
    <div>
      <Typography variant="h2" gutterBottom>Books</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Book Title</b>
              </TableCell>
              <TableCell>
                <b>Author</b>
              </TableCell>
              <TableCell>
                <b>Published</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              books.map(b =>
                <TableRow key={b.title}>
                  <TableCell>
                    {b.title}
                  </TableCell>
                  <TableCell>
                    {b.author}
                  </TableCell>
                  <TableCell>
                    {b.published}
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

export default Book