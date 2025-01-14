export type Questions = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type QuestionsAction =
  | { type: "dataRecieved"; payload: Questions[] }
  | { type: "dataFailed" }
  | { type: "startQuiz" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "quizFinished" }
  | { type: "restartQuiz" }
  | { type: "tick" };

export type QuestionsState = {
  questions: Questions[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
};
