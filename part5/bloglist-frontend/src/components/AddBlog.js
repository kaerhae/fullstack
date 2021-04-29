import React, { useState } from 'react'

const AddBlog = ({ createBlog }) => {
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
        <form onSubmit={addBlog}>
          <div>Title 
            <input
            type="text"
            value={title}
            name="title"
            onChange={titleOnChange}
            />
          </div>
          <div>URL 
            <input
            type="text"
            value={url}
            onChange={urlOnChange}
            />
            </div>
          <div>Author 
            <input
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


export default AddBlog