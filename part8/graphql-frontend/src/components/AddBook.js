import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'


const AddBook = ({ createBook }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ published, setPublished ] = useState(null)
  const [ genre, setGenre ] = useState('')
  const [ genreList, setGenreList ] = useState([])

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


  const submit = async (event) => {
    event.preventDefault()
    const genres = genreList
    createBook({  variables: { title, author, published, genres } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenreList([])
  }

  console.log(genreList)


  return (
    <div style={{  padding:'10px' }}>
      <form onSubmit={submit}>
        <div className="form-inputfield">
          <TextField
            label="Title"
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
            onChange={authorOnChange}
          />
        </div>
        <div className="form-inputfield">
          <TextField
            label="Published"
            type="text"
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
          <Button onClick={() => setGenreList(genreList.concat(genre))}>Add Genre</Button>
        </div>
        <Typography variant="h6" style={{ float: 'left' }}>Genres: </Typography>
        { genreList &&
            <Typography variant="h6">{genreList.map(g => g).join(', ')}</Typography>
        }
        <div>
          <Button style={{ background: 'black', color: 'white', margin: '5px' }} type="submit">Add New Book</Button>
        </div>
      </form>
    </div>
  )
}

export default AddBook