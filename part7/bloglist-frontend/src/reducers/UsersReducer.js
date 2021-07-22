import blogService from './../services/blogs'

const usersReducer = ( state = [], action ) => {
  switch( action.type ) {
  case 'INIT_USERS':
    return action.data.sort((a, b) => a.username - b.username)
  default:
    return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await blogService.getUsers()
    console.log(users)
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer