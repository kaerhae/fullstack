import React, { useState } from 'react'
import AddBlog from './AddBlog'
const BlogForm = () => {
  const [ formVisible, setFormVisible ] = useState(false)
  const hideWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="create-button" onClick={() => setFormVisible(true)}>Create New Blog</button>
      </div>
      <div style={showWhenVisible}>
        <AddBlog
          setFormVisible={setFormVisible}
        />
        <button onClick={() => setFormVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default BlogForm