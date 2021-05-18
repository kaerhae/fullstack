import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({
  createBlog
}) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const urlOnChange = (event) => {
    setUrl(event.target.value)
  }
  const titleOnChange = (event) => {
    setTitle(event.target.value)
  }
  const authorOnChange = (event) => {
    setAuthor(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      url: url,
      author:author
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form className="blog-form" onSubmit={addBlog}>
        <div>Title
          <input
            className="title"
            type="text"
            value={title}
            name="title"
            onChange={titleOnChange}
          />
        </div>
        <div>URL
          <input
            className="url"
            type="text"
            value={url}
            onChange={urlOnChange}
          />
        </div>
        <div>Author
          <input
            className="author"
            type="text"
            value={author}
            onChange={authorOnChange}
          />
        </div>
        <button type="submit">Add New Blog</button>
      </form>
    </div>
  )
}

AddBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default AddBlog