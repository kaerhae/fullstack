import React, { useState } from 'react'
import AddBlog from './AddBlog'
import { Button } from '@material-ui/core'
const BlogForm = () => {
  const [ formVisible, setFormVisible ] = useState(false)
  const hideWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  return (
    <div>
      <h1>Blogs</h1>
      <div style={hideWhenVisible}>
        <Button style={{ background: 'black', color: 'white', margin:'10px' }} className="create-button" onClick={() => setFormVisible(true)}>Create New Blog</Button>
      </div>
      <div style={showWhenVisible}>
        <AddBlog
          setFormVisible={setFormVisible}
        />
      </div>
    </div>
  )
}

export default BlogForm