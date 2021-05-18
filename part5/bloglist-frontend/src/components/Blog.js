import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [ infoVisible, setInfoVisible ] = useState(false)
  const toggleInfo = { display: infoVisible ? '' : 'none' }

  const toggleView = () => {
    setInfoVisible(!infoVisible)
  }

  const handleLike = (event) => {
    event.preventDefault()
    console.log(blog)

    updateBlog({
      title: blog.title,
      id: blog.id,
      likes: (blog.likes += 1),
      author: blog.author,
      url: blog.url
    }, blog.id)
  }

  const handleDelete = () => {
    console.log(blog.id)
    removeBlog(blog.id)
  }

  return (

    <div className="blogContainer">

      <div className="blog-item-visible"><i>{blog.title}</i><button onClick={toggleView}>View</button></div>
      <div className="blog-item-hidden" style={toggleInfo}>{blog.url}</div>
      <div className="blog-item-hidden" style={toggleInfo}>Likes: {blog.likes}<button className="button-like" value={blog.id} onClick={handleLike}>Like</button></div>
      <div className="blog-item-hidden" style={toggleInfo}>{blog.author}</div>
      <div className="blog-item-hidden" style={toggleInfo}>Blog added by: {blog.user.name}</div>
      {
        user.name === blog.user.name &&
        <button value={blog.id} onClick={handleDelete}>Remove</button>
      }
    </div>

  )
}


Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    likes: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired
  }),
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }),
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
}

export default Blog