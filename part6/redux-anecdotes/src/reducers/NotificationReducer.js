const initialState = null

const notificationReducer = (state = initialState, action) => {
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

export default notificationReducer