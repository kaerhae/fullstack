const initialState = ''
let timeoutID = null

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.message
  default:
    return state
  }
}

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    message,
  }
}

export const setNotification = (message, seconds) => {
  if (timeoutID !== null) {
    clearTimeout(timeoutID)
  }
  return async (dispatch) => {
    console.log(message)
    dispatch(notify(message))
    timeoutID = setTimeout(() => {
      dispatch(notify(''))
    }, seconds * 1000)
  }
}

export default notificationReducer