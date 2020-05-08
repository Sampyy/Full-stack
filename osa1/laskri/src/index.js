import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
     <Display counter={counter} />
     <Button handleClick={increaseByOne} text="plus" />
     <Button handleClick={decreaseByOne} text="minus" />
     <Button handleClick={setToZero} text="reset" />
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

let counter = 1

ReactDOM.render(
  <App counter={counter} />,
  document.getElementById('root')
)
