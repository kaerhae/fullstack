const initialState = null
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
  console.log(timeoutID)
  if (timeoutID !== null) {
    clearTimeout(timeoutID)
  }
  return async (dispatch) => {
    dispatch(notify(message))
    timeoutID = setTimeout(() => {
      dispatch(notify(null))
    }, seconds * 1000);
  }
}

export default notificationReducer