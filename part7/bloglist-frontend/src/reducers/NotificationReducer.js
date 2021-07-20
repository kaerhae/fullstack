const initState = ''
let timeoutID = null

const notificationReducer = (state = initState, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.message
  default:
    return state
  }
}

export const notify = message => {
  return {
    type: 'NOTIFY',
    message
  }
}

export const setNotification = (message, seconds) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  return async (dispatch) => {
    dispatch(notify(message))
    timeoutID = setTimeout(() => {
      dispatch(notify(''))
    }, seconds * 1000)
  }
}

export default notificationReducer