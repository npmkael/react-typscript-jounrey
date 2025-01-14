import { useQuiz } from "../contexts/QuizContext";

const FinishScreen = () => {
  const { points, highscore, maxPossiblePoints, dispatch } = useQuiz();

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
