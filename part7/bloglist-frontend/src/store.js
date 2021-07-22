import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/NotificationReducer'
import blogReducer from './reducers/BlogReducer'
import thunk from 'redux-thunk'
import userReducer from './reducers/UserReducer'
import usersReducer from './reducers/UsersReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store