import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => {

  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([
    0, 0, 0, 0, 0 ,0
  ])



  const randomAnect = Math.floor(Math.random() * anecdotes.length)

  const clickHandler = () => {
    
    // Console-komento satunnaisgeneraattorin tarkistusta varten
    const newSelected = anecdotes[randomAnect]
    console.log(newSelected)
    console.log(randomAnect)

    setSelected(randomAnect)
  }

  const handleVote = (props) => {

    const valittuPoint = points[selected]
    const newVote = {
      ...points,
      valittuPoint: points += 1
    }

    setPoints(newVote)



  }

  return (
    <div>
      {props.anecdotes[selected]}
      <div>This has {points[selected]} votes</div>
      <Button text="Vote" onClick={handleVote} />
      <Button text="Next anecdote" onClick={clickHandler}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = [0, 0, 0, 0, 0, 0]




ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)