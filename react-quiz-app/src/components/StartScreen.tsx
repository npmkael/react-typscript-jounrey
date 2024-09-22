import React from "react";
import { QuestionsAction } from "../models";

type Props = {
  numberOfQuestions: number;
  dispatch: React.Dispatch<QuestionsAction>;
};

const StartScreen = ({ numberOfQuestions, dispatch }: Props) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numberOfQuestions} questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
