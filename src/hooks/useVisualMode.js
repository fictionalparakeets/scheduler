import { useState } from 'react';


/*
    take in an initial mode
    set the mode state with the initial mode provided
    return an object with a mode property
*/

export default function useVisualMode(initialMode, replace) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

  const transition = (newMode) => {
    if (replace) {
      history.push(newMode)
      setMode(newMode)
    }
  }
  
  const back = () => {
    if (history[history.length - 1] === mode) {
      history.pop()
    }
    if (history.length) {
      setMode(history.pop())
    }
  }

  console.log('history: ', history)
  
  return { mode, transition, back };
}


