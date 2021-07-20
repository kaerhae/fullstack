import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import NotificationReducer from './reducers/NotificationReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: NotificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store