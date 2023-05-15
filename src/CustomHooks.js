import React from 'react'
import { useCounter } from './useCounter'

const CustomHooks = () => {
  const { count, increment, decrement, double, triple, reset } = useCounter(3)
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={double}>x2</button>
      <button onClick={triple}>x3</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default CustomHooks
