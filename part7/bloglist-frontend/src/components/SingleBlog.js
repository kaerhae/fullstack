import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import commentService from '../services/comment'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { likeBlog, commentBlog } from '../reducers/BlogReducer'
import { setNotification } from '../reducers/NotificationReducer'

const SingleBlog = (props) => {

  const [ comment, setComment ] = useState('')

  const id = useParams().id
  const blog = props.blogById(id)

  const commentOnChange = (event) => {
    setComment(event.target.value)
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
      props.setNotification(`Error happened! ${e}`, 4)
    }
  }
  console.log(blog)

  const handleComment = async (e) => {
    e.preventDefault()
    const id = blog.id
    try {
      const blog = {
        content: comment
      }
      await commentService.comment(id, blog)
      props.commentBlog(id, blog)
      props.setNotification('A New Comment Added!', 4)
    } catch (e) {
      props.setNotification(`Error happened! ${e}`, 4)
    }
  }

  if (!blog) {
    <div>Fetching Blog Information...</div>
  }
  else {
    return (
      <div>
        <h1>{blog.title} {blog.author}</h1>
        <Link to={blog.url}>{blog.url}</Link>
        <div>
          <p>{blog.likes} likes
            <Button style={{
              background: 'black',
              color:'white',
              margin:'10px'
            }} value={blog.id} onClick={handleLike}>Like</Button>
          </p>
          <p>Added by: {blog.user.name}</p>
        </div>
        <h1 style={{ marginTop:'90px' }}>Comments</h1>
        <form onSubmit={handleComment}>
          <div>
            <TextField
              label="Comment this post"
              type="text"
              value={comment}
              name="Username"
              onChange={commentOnChange}
            />
          </div>
          <Button
            id="login-button"
            style={{
              background: 'black',
              color: 'white',
              margin: '10px'
            }}
            type="submit
          ">Send Comment</Button>
        </form>
        {
          blog.comments.map(k =>
            <p key={k.id}>{k.content}</p>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  commentBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBlog)