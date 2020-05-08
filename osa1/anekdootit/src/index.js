import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const GetRandom = (props) => {
  return (
    Math.random() * props.size
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Int16Array(props.anecdotes.length))
  const [indexOfMax, setindexOfMax] = useState(0)
  const [max, setmax] = useState(0)


  const getRandom = () => {
    return(
     Math.floor(Math.random() * props.anecdotes.length)
    )
  }

  const vote = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    getMax(copy)
  }

  const getMax = (copy) => {
    for (let i = 0; i < props.anecdotes.length; i++) {
      if (copy[i] > max) {
        setindexOfMax(i)
        setmax(copy[i])
      }
    }
  }

  const setNext = () => {
    setSelected(getRandom)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={vote} selected={selected}>
        vote
      </button>
      <button onClick={setNext}>
        Next anecdote
      </button>

      <h2>Anecdote with most votes</h2>

      <div>{props.anecdotes[indexOfMax]}</div>
      <div>has {points[indexOfMax]} votes</div>
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