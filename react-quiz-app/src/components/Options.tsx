import React from "react";
import { Questions } from "../models";
import { QuestionsAction } from "../models";

type Props = {
  question: Questions;
  dispatch: React.Dispatch<QuestionsAction>;
  answer: number | null;
};

const Options = ({ question, dispatch, answer }: Props) => {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
