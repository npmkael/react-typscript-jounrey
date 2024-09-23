import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Page from "./components/Page";
import Loader from "./components/Loader";
import ErrorHandler from "./components/ErrorHandler";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import { Questions } from "./models";
import { QuestionsAction } from "./models";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

type QuestionsState = {
  questions: Questions[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
};

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: QuestionsState, action: QuestionsAction) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion?.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "quizFinished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restartQuiz":
      // return {
      //   ...initialState,
      //   questions: state.questions,
      //   status: "ready",
      // };
      return {
        ...state,
        questions: state.questions,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: 10,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
        status:
          state.secondsRemaining !== null && state.secondsRemaining <= 0
            ? "finished"
            : state.status,
      };
    default:
      throw new Error("ddd");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (prev: number, cur: Questions) => prev + cur.points,
    0
  );

  // Fetching from Fake API
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Page>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <ErrorHandler />}
        {state.status === "ready" && (
          <StartScreen numberOfQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              index={state.index}
              numQuestion={numQuestions}
              points={state.points}
              maxPossiblePoints={maxPossiblePoints}
              answer={state.answer}
            />
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={state.secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                index={state.index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {state.status === "finished" && (
          <FinishScreen
            points={state.points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={state.highscore}
            dispatch={dispatch}
          />
        )}
      </Page>
    </div>
  );
}

export default App;
