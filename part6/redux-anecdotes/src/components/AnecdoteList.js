import React from 'react'
import anecdoteService from '../services/anecdoteService'
import { useDispatch, connect } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from '../reducers/NotificationReducer'
const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  
  const vote = async (id, content, votes) => {
    const newObj = {id, content, votes: votes + 1}
    console.log('vote', id)
    await anecdoteService.vote(id, newObj)
    dispatch(voteAnecdote(id))
    props.setNotification(`You have voted '${content}'`, 3)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  if (state.filter === null) {
    return { anecdotes: state.anecdotes }
  }
  return {
    anecdotes: state.anecdotes.filter(a => 
      a.content.toLowerCase().includes(state.filter)
    )
  }
}

const mapDispatchToProps = {
  setNotification,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)