import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK } from '../queries'


const AddBook = () => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ published, setPublished ] = useState('')
  const [ genre, setGenre ] = useState('')
  const [ genreList, setGenreList ] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS } ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  const publishedOnChange = (event) => {
    setPublished(parseInt(event.target.value))
  }
  const titleOnChange = (event) => {
    setTitle(event.target.value)
  }
  const authorOnChange = (event) => {
    setAuthor(event.target.value)
  }

  const genreOnChange = (event) => {
    setGenre(event.target.value)
  }

  const genreListOnChange = (event) => {
    event.preventDefault()
    setGenreList(genreList.concat(genre))
    setGenre('')
  }


  const submit = async (event) => {
    event.preventDefault()
    const genres = genreList
    createBook({  variables: { title, author, published, genres } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenreList([])
  }

  return (
    <div style={{ marginLeft:'20%' }}>
      <form onSubmit={submit}>
        <div className="form-inputfield">
          <TextField
            label="Title"
            required
            type="text"
            value={title}
            name="title"
            onChange={titleOnChange}
          />
        </div>
        <div className="form-inputfield">
          <TextField
            label="Author"
            type="text"
            value={author}
            required
            onChange={authorOnChange}
          />
        </div>
        <div className="form-inputfield">
          <TextField
            label="Published"
            type="text"
            required
            value={published}
            onChange={publishedOnChange}
          />
        </div>
        <div className="form-inputfield">
          <TextField
            label="Genre"
            type="text"
            value={genre}
            onChange={genreOnChange}
          />
          <Button style={{background:'#CFE0EEs', border:'1px solid black', color:'black' }} onClick={genreListOnChange}>Add Genre</Button>
        </div>
        <Typography className="form-inputfield" variant="h6" >
          Genres: { genreList ? genreList.map(g => g).join(', ') : null }
        </Typography>
        <Button style={{ background: 'black', color: 'white', margin: '15px' }} type="submit">Add New Book</Button>
      </form>
    </div>
  )
}

export default AddBook