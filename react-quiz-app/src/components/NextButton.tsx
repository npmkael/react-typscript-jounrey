import React from "react";
import { QuestionsAction } from "../models";

type Props = {
  dispatch: React.Dispatch<QuestionsAction>;
  answer: number | null;
  index: number;
  numQuestions: number;
};

const NextButton = ({ dispatch, answer, index, numQuestions }: Props) => {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quizFinished" })}
      >
        Finish
      </button>
    );
  }
};

export default NextButton;
