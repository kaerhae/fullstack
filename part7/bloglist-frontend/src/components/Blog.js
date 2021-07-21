import React, { useState } from 'react'
import blogService from './../services/blogs'
import { removeBlog, likeBlog } from '../reducers/BlogReducer'
import { connect } from 'react-redux'

const Blog = (props) => {
  const [ infoVisible, setInfoVisible ] = useState(false)
  const toggleInfo = { display: infoVisible ? '' : 'none' }


  const toggleView = () => {
    setInfoVisible(!infoVisible)
  }

  const handleLike = async (e) => {
    e.preventDefault()
    try {
      const newObject = {
        title: blog.title,
        id: blog.id,
        likes: (blog.likes += 1),
        author: blog.author,
        url: blog.url
      }
      const id = e.target.value
      await blogService.update(newObject, id)
      props.likeBlog(id)
    }catch (e) {
      console.log('Error')
    }
  } 

  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        const id = e.target.value
        await blogService.remove(id)
        removeBlog(id)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div>
      {
        props.blogs.map(blog =>
          <div className="blogContainer" key={blog.id}>
            <div className="blog-item-visible"><i>{blog.title}</i><button id='view-button' onClick={toggleView}>View</button></div>
            <div className="blog-item-hidden" style={toggleInfo}>{blog.url}</div>
            <div className="blog-item-hidden" style={toggleInfo}>Likes: {blog.likes}<button className="button-like" value={blog.id} onClick={likeBlog}>Like</button></div>
            <div className="blog-item-hidden" style={toggleInfo}>{blog.author}</div>
            <div className="blog-item-hidden" style={toggleInfo}>Blog added by: {blog.user.name}</div>
            {
              props.user.name === blog.user.name &&
              <button
                id='button-remove'
                value={blog.id}
                onClick={handleDelete}
              >
                Remove
              </button>
            }
          </div>
        )
      }
    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  removeBlog,
  likeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
