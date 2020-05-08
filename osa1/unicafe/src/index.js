import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =({onClick, text}) => {
  return(
  <button onClick={onClick}>
    {text}
  </button>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (<p>No feedback given.</p>)
  }
  return(
  <>
    <h2>Statistics</h2>
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good-bad)/all} />
        <StatisticLine text="positive" value={good/all} />
      </tbody>
    </table>
  </>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const handleGoodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
      <><h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text ="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)