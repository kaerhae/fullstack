import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';


const Header = (props) => {
  return (
  <h1>{props.otsikko}</h1>
  )}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>

  )
}

const StatisticLine = (props) => {

 return (
  <table>
    <tbody>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    </tbody>
  </table>

  )
}

const Statistics = (props) =>  {

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <StatisticLine text="Good" value ={props.good} />
      <StatisticLine text="Neutral" value ={props.neutral} />
      <StatisticLine text="Bad" value ={props.bad} />
      <StatisticLine text="Count of Reviews: " value={props.all}/>
      <StatisticLine text="Average: " value={props.average}/>
      <StatisticLine text="Positive review: " value={props.pos}/>
    </div>
  )
}

const App = () => {
  const otsikko = 'Give Feedback'
  const otsikko2 = 'Statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)

  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }


  const all = good + neutral + bad 
  const average = ((good * 1) + (neutral * 0) + (bad * (-1)) ) / (bad + neutral + good)
  const rAverage = average.toFixed(2)
  const pos = good / (bad + neutral + good)
  const rPos = pos.toFixed(2)

  return (
    <div>
      <Header otsikko={otsikko} />
      <Button 
      text="Good" 
      onClick={handleGoodClick}
      />
      <Button 
      text="Neutral" 
      onClick={handleNeutralClick}
      />
      <Button 
      text="Bad" 
      onClick={handleBadClick}
      />
      <Header otsikko={otsikko2} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={rAverage}
        pos={rPos}
      />
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))