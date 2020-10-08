import { useState } from "react";

//use history to track mode changes and allow return back to previous modes
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    setHistory(prev => {
      let newArr = [...prev];
      if (replace) {
        newArr = newArr.slice(0, newArr.length - 1);
      }
      return [...newArr, newMode];
    });
  };

  const back = function() {
    setHistory(prev => {
      const newArr = [...prev];
      if (newArr.length > 1) {
        return newArr.slice(0, newArr.length - 1);
      }
      return newArr;
    });
  };

  return {mode: history[history.length - 1], transition, back};
};