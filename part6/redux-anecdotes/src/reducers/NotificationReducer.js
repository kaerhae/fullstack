const initialState = null

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
  return (dispatch) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(notify(null))
    }, (seconds * 1000))
  }
}

export default notificationReducer