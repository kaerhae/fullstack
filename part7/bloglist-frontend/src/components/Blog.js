import React from 'react'
import blogService from './../services/blogs'
import { removeBlog, likeBlog } from '../reducers/BlogReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'

const Blog = (props) => {

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
      <div className="blog-item"><i><Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link></i></div>
      {
        props.user.name === props.blog.user.name &&
        <DeleteIcon
          id='button-remove'
          className="button-remove"
          value={props.blog.id}
          onClick={handleDelete}
        />
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
