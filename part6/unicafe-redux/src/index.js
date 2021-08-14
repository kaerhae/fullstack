import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import { createStore } from 'redux'
import reducer from './reducer'


const store = createStore(reducer)
const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const clear = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  

  console.log(store.getState().good)
  console.log(store.getState().bad)
  console.log(store.getState().ok)
  console.log(store.getState().clear)

  return (
    <div>
      <div className="buttons">
      <button className="button-good" onClick={good}>Good</button> 
      <button className="button-ok" onClick={neutral}>Neutral</button> 
      <button className="button-bad" onClick={bad}>Bad</button>
      
      </div>
      <div className="result">
          <div className="result-good">Good
            <div>{store.getState().good}</div>
          </div>
          <div className="result-ok">OK 
            <div>{store.getState().ok}</div>
          </div>
          <div className="result-bad">Bad
            <div>{store.getState().bad}</div>
          </div>
        </div>
        <button className="button-clear" onClick={clear}>Reset Stats</button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)