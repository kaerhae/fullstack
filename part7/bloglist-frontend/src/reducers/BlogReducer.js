import blogService from './../services/blogs'

const blogReducer = ( state = [], action ) => {
  switch( action.type ) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'LIKE': {
    const id = action.data.id
    const changingBlog = state.find(b => b.id === id)
    const blog = {
      ...changingBlog,
      likes: changingBlog.likes + 1
    }
    const newBlogs = state.map(b =>
      b.id !== id ? b : blog
    )
    return newBlogs.sort((a, b) => b.likes - a.likes)
  }
  case 'COMMENT': {
    const id = action.data.id
    const content = action.data.content
    console.log(id)
    console.log(content)
    const changingBlog = state.find(b => b.id === id)
    const blog = {
      ...changingBlog,
      comments: changingBlog.comments.concat(content)
    }
    const newBlogs = state.map(b =>
      b.id !== id ? b : blog
    )
    return newBlogs
  }
  case 'REMOVE': {
    const removableID = action.data.id
    const removableBlog = state.filter(b => b.id !== removableID)
    return removableBlog.sort((a, b) => b.likes - a.likes)
  }
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data
  }
}

export const likeBlog = (id) => {
  return {
    type: 'LIKE',
    data: { id }
  }
}

export const commentBlog = (id, content) => {
  return {
    type: 'COMMENT',
    data: { id, content }
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE',
    data: { id }
  }
}

export default blogReducer