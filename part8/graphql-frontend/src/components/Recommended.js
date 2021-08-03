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
import React from 'react'


const Recommended = ({ user, books }) => {


  if (!books) {
    return null
  }
  

  console.log(books)
    const favorite = books.filter(a => {
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
}

export default Recommended