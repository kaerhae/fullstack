import React from 'react'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/NotificationReducer'
import { filter } from '../reducers/filterReducer'
const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter === null) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
  })

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(notify(
      `You have voted '${content}'`
    ))
    setTimeout(() => {
      dispatch(notify(null))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList