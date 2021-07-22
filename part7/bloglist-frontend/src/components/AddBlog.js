import React, { useState } from 'react'
import blogService from './../services/blogs'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/NotificationReducer'
import { createBlog } from '../reducers/BlogReducer'
const AddBlog = (props) => {
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

  const addBlog = async (e) => {
    e.preventDefault()
    try {
      const newObject = {
        title: title,
        url: url,
        author:author
      }
      const add = await blogService.create(newObject)
      console.log('hi')
      props.createBlog(add)
      props.setNotification('A New Blog Added!', 4)
    } catch (e) {
      props.setNotification(`Error: ${e}`, 4)
    }
    props.setFormVisible(false)
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
        <button className="add-button" type="submit">Add New Blog</button>
      </form>
    </div>
  )
}

AddBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  setNotification,
  createBlog
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBlog)