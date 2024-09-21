import { useEffect, useReducer } from "react";
import Header from "./Header";
import Page from "./Page";
import Loader from "./Loader";
import ErrorHandler from "./ErrorHandler";
import StartScreen from "./StartScreen";

type Questions = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type QuestionsState = {
  questions: Questions[];
  status: string;
};

type QuestionsAction =
  | { type: "dataRecieved"; payload: Questions[] }
  | { type: "dataFailed" };

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
          <StartScreen numberOfQuestions={numQuestions} />
        )}
      </Page>
    </div>
  );
}

export default App;
