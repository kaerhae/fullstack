import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Typography,
  Container
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommended = ({ user }) => {

  const bookResult = useQuery(ALL_BOOKS)

  

  if (user && bookResult.data) {
    const favorite = bookResult.data.allBooks.filter(a => {
      return a.genres.some(b => {
        return b.includes(user.favoriteGenre)
      })
    })
  
    
    return (
      <Container>
        <Typography variant="h3">Recommendations</Typography>
        <Typography variant="h5">Books in your favorite genre: <i>{user.favoriteGenre}</i></Typography>
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
                favorite.map(f =>
                  <TableRow key={f.id}>
                    <TableCell>
                      {f.title}
                    </TableCell>
                    <TableCell>
                      {f.author.name}
                    </TableCell>
                    <TableCell>
                      {f.published}
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    )
  } else {
    return null
  }
}

export default Recommended