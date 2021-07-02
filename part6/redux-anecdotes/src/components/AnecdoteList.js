import React from 'react'
import anecdoteService from '../services/anecdoteService'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from '../reducers/NotificationReducer'
const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter === null) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
  })

  const vote = async (id, content, votes) => {
    const newObj = {id, content, votes: votes + 1}
    console.log('vote', id)
    await anecdoteService.vote(id, newObj)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You have voted '${content}'`, 10))
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
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList