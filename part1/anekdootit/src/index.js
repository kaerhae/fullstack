import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => {

  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}




const App = (props) => {
  const points = new Array(6).fill(0);
  console.log(points)
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(0)

  const clickHandler = () => {
    
    // Console-komento satunnaisgeneraattorin tarkistusta varten
    const randomAnect = Math.floor(Math.random() * anecdotes.length)
    const newSelected = anecdotes[randomAnect]
    console.log(newSelected)
    console.log(randomAnect)
    setSelected(randomAnect)
  }

  const voteHandler = (props) => {
    const copy = {...points }

    const newVotes = {

    }


    setPoint(newVotes)

  }


  return (
    <div>
      {props.anecdotes[selected]}
      <p>Has {props.points} votes</p>
      <Button text="Vote" onClick={voteHandler} />
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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)