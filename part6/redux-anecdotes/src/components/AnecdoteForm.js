import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/NotificationReducer'

const AnecdoteForm = () => {
  
  
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notify(
      `You have created '${content}'`
    ))
    setTimeout(() => {
      dispatch(notify(null))
    }, 5000)
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm