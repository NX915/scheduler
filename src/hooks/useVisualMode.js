import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    // setMode(newMode);
    setHistory(prev => {
      // console.log(prev);
      let newArr = [...prev];
      if (replace) {
        newArr = newArr.slice(0, newArr.length - 1);
      }
      // console.log(newArr);
      return [...newArr, newMode];
    });
  };

  const back = function() {
    setHistory(prev => {
      // console.log(prev);
      const newArr = [...prev];
      if (newArr.length > 1) {
        return newArr.slice(0, newArr.length - 1);
      }
      // console.log(newArr);
      return newArr;
    });
    // console.log(history[history.length - 1]);
    
    // const backAmount = history.length > 1 ? 2 : 1;
    // setMode(history[history.length - backAmount]);
  };

  return {mode: history[history.length - 1], transition, back};
};