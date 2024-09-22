import React from "react";
import { QuestionsAction } from "../models";

type Props = {
  dispatch: React.Dispatch<QuestionsAction>;
  answer: number | null;
};

const NextButton = ({ dispatch, answer }: Props) => {
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};

export default NextButton;
