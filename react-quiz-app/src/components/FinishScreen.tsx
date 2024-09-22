import React from "react";

type Props = {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
};

const FinishScreen = ({ points, maxPossiblePoints, highscore }: Props) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You score <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
    </>
  );
};

export default FinishScreen;
