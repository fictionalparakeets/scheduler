import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const newHistory = [...history];

  function transition(newMode, replace = false) {
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(newMode);
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  }

  function back() {
    if (newHistory.length - 1) {
      newHistory.pop();
    }
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  }

  return { mode, transition, back };
}
