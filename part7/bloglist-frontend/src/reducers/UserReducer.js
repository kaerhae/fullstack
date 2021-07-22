const initState = ''

const userReducer = (state = initState, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const loginUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  }
}

export const setUser = (user) => {

  return async (dispatch) => {
    console.log(user)
    dispatch(loginUser(user))
  }
}

export default userReducer