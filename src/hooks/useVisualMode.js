import { useState } from "react";

/*
    take in an initial mode
    set the mode state with the initial mode provided
    return an object with a mode property
*/

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
    }
    history.push(newMode);
    setMode(newMode);
  };

  const back = () => {
    if (history[history.length - 1] === mode) {
      history.pop();
    }
    if (history.length) {
      setMode(history.pop());
    }
  };

  return { mode, transition, back };
}
