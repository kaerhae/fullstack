import React, { useState } from 'react'

const Blog = ({ blog, blogs, updateBlog }) => {
  const [ infoVisible, setInfoVisible ] = useState(false)

  const toggleInfo = { display: infoVisible ? '' : 'none' }

  const toggleView = () => {
    setInfoVisible(!infoVisible)
  }

  const handleLike = (event) => {
    event.preventDefault()
    console.log(blog.id)
 
      updateBlog({
        title: blog.title,
        id: blog.id,
        likes: (blog.likes += 1),
        author: blog.author,
        url: blog.url
      }, blog.id)
  }
  
  return (
    <div className="blogContainer">
      <div className="blog-item"><i>{blog.title}</i><button onClick={toggleView}>View</button></div>
      <div className="blog-item" style={toggleInfo}>{blog.url}</div>
      <div className="blog-item" style={toggleInfo}>Likes: {blog.likes}<button value={blog.id} onClick={handleLike}>Like</button></div>
      <div className="blog-item" style={toggleInfo}>{blog.author}</div>
    </div>
  )  
}
export default Blog