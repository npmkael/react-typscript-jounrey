import React, { useEffect } from "react";
import { QuestionsAction } from "../models";

type Props = {
  dispatch: React.Dispatch<QuestionsAction>;
  secondsRemaining: number | null;
};

const Timer = ({ dispatch, secondsRemaining }: Props) => {
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
