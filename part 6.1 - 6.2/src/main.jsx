import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  const dispatch = useDispatch()
  const feedback = useSelector(state => state)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => dispatch({ type: 'GOOD' })}>Good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>Ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>Bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>Reset</button>
      <h1>Statistics</h1>
      <div>Good: {feedback.good}</div>
      <div>Ok: {feedback.ok}</div>
      <div>Bad: {feedback.bad}</div>
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
