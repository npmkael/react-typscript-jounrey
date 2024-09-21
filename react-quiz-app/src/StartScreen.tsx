import React from "react";

type Props = {
  numberOfQuestions: number;
};

const StartScreen = ({ numberOfQuestions }: Props) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numberOfQuestions} questions to test your React Mastery</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
};

export default StartScreen;
