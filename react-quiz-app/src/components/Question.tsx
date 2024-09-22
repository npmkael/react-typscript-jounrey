import React from "react";
import { Questions } from "../models";
import { QuestionsAction } from "../models";
import Options from "./Options";

type Props = {
  question: Questions;
  dispatch: React.Dispatch<QuestionsAction>;
  answer: number | null;
};

const Question = ({ question, dispatch, answer }: Props) => {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default Question;
