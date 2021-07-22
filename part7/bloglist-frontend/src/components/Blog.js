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
      const id = e.target.value
      const likedBlog = props.blogs.find(b => b.id === id)
      const blog = {
        ...likedBlog,
        likes: likedBlog.likes + 1
      }
      await blogService.update(blog, id)
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
        props.removeBlog(id)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="blogContainer">

      <div className="blog-item-visible"><i>{props.blog.title}</i><button id='view-button' onClick={toggleView}>View</button></div>
      <div className="blog-item-hidden" style={toggleInfo}>{props.blog.url}</div>
      <div className="blog-item-hidden" style={toggleInfo}>Likes: {props.blog.likes}<button className="button-like" value={props.blog.id} onClick={handleLike}>Like</button></div>
      <div className="blog-item-hidden" style={toggleInfo}>{props.blog.author}</div>
      <div className="blog-item-hidden" style={toggleInfo}>Blog added by: {props.blog.user.name}</div>
      {
        props.user.name === props.blog.user.name &&
        <button
          id='button-remove'
          value={props.blog.id}
          onClick={handleDelete}
        >
          Remove
        </button>
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
