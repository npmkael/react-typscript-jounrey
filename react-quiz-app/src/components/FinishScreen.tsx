import React from "react";
import { QuestionsAction } from "../models";

type Props = {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
  dispatch: React.Dispatch<QuestionsAction>;
};

const FinishScreen = ({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}: Props) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You score <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
