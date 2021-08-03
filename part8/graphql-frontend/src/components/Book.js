import React, {useEffect, useState} from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Typography,
  Container,
} from '@material-ui/core'
import Filter from './Filter'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Book = ({ genres }) => {
  const [ books, setBooks ] = useState('')

  const [ filterValue, setFilterValue ] = useState('')

  const [getBook, bookResult] = useLazyQuery(ALL_BOOKS)


  useEffect(() => {
    if(!filterValue) {
      getBook()
    }
  }, [])

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks)
    }  
  }, [bookResult])
  



  const mapGenres = genres.map(g => g.genres)
  const single = mapGenres.reduce((a, b) => a.concat(b))
  const uniqueNames = single.filter((val,id,array) => array.indexOf(val) === id)

  let options = uniqueNames.map(u => {
    return {
      name: u,
      value: u
    }
  })

  options = [ {name:"All", value: "all"}, ...options]



  const handleOnChange = filterValue => {
    setFilterValue(filterValue.value)
  }

  const submitSelect = (e) => {
    e.preventDefault()
    if (filterValue === 'all') {
      getBook()
    } else {
      getBook({ variables: { genre: filterValue }})
    }

  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Books</Typography>
      <Filter 
        options={options}
        submitSelect={submitSelect}
        handleOnChange={handleOnChange}
      />
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
              books ?
              books.map(b =>
                <TableRow key={b.id}>
                  <TableCell>
                    {b.title}
                  </TableCell>
                  <TableCell>
                    {b.author.name}
                  </TableCell>
                  <TableCell>
                    {b.published}
                  </TableCell>
                </TableRow>
              )
              : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Book