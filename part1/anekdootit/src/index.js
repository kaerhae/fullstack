import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => {

  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = (props) => {

  const pointArray = new Array(6).fill(0)

  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(pointArray)
  const [bestVote, setBestVote] = useState(0)
  




  const clickHandler = () => {
    const randomAnect = Math.floor(Math.random() * anecdotes.length)

    const newSelected = anecdotes[randomAnect]
    // Console-komento satunnaisgeneraattorin tarkistusta varten


    console.log(newSelected)
    console.log(randomAnect)

    setSelected(randomAnect)

  }


  const handleVote = () => {

    let copy = [...points]
    copy[selected] += 1
    setPoint(copy)

    console.log(points)

    console.log(Math.max(...points))

    const mostVotes = Math.max(...points)
    const findIndex = points.findIndex(point => point === mostVotes)
    setBestVote(findIndex)
  }

  
 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}

     
      <p>This anecdote has {points[selected]} votes</p>
      <Button text="Next anecdote" onClick={clickHandler}/>
      <Button text="Vote" onClick={handleVote} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[bestVote]}</p>
     
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