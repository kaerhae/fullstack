const initialState = null

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTER':
      return action.filter
    default:
      return state
  }
}

export const filter = filter => {
  return {
    type: 'FILTER',
    filter
  }
}

export default filterReducer