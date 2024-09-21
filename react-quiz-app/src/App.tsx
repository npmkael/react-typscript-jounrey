import { useEffect, useReducer } from "react";
import Header from "./Header";
import Page from "./Page";
import Loader from "./Loader";
import ErrorHandler from "./ErrorHandler";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { Questions } from "./models";
import { QuestionsAction } from "./models";

type QuestionsState = {
  questions: Questions[];
  status: string;
};

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished
  status: "loading",
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
      };
    default:
      throw new Error("ddd");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;

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
        {state.status === "active" && <Question />}
      </Page>
    </div>
  );
}

export default App;
