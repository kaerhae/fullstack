import anecdoteService from "../services/anecdoteService"



export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}


const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const voteToChange = state.find(n => n.id === id)
      console.log(voteToChange)
      const vote = { 
        ...voteToChange, 
        votes: voteToChange.votes + 1
      }
      console.log(vote)
      const newVotes = state.map(v =>
        v.id !== id ? v : vote 
      )

      return newVotes.sort((a, b) => b.votes - a.votes)


    case 'NEW_ANECDOTE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      return action.data.sort((a,b) => b.votes - a.votes)
    default:
      return state
  }
}

export default anecdoteReducer