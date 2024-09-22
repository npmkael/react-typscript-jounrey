import React from "react";
import { Questions } from "../models";
import Options from "./Options";

type Props = {
  question: Questions;
};

const Question = ({ question }: Props) => {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} />
    </div>
  );
};

export default Question;
