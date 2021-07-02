import React from 'react'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import NotificationReducer from './reducers/NotificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: NotificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store