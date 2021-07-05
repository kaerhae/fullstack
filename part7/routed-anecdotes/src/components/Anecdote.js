import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Anecdote = ({ anecdoteById }) => {

  const id = useParams().id
  const anecdote = anecdoteById(id)
  return (
    <div>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>Has {anecdote.votes} votes</p>
      <p>For more info, see <Link>{anecdote.info}</Link></p>
    </div>
  )
}

export default Anecdote