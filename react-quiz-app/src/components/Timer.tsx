import React, { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

const Timer = () => {
  const { secondsRemaining, dispatch } = useQuiz();
  // handling possible null (secondsRemaining)
  const mins = Math.floor((secondsRemaining ?? 0) / 60);
  const seconds = (secondsRemaining ?? 0) % 60;
  useEffect(
    function () {
      const timerId = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timerId);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
