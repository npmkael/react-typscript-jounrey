import { useReducer } from "react";
import "./App.css";

type BankState = {
  balance: number;
  loan: number;
  isOpen: boolean;
};

type BankAction =
  | { type: "openAccount" }
  | { type: "deposit"; payload: number }
  | { type: "widthraw"; payload: number }
  | { type: "loan"; payload: number }
  | { type: "payLoan" }
  | { type: "closeAccount" };

const initialState = {
  balance: 0,
  loan: 0,
  isOpen: false,
};

function reducer(state: BankState, action: BankAction) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isOpen: true,
        balance: 500,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "widthraw":
      return {
        ...state,
        balance:
          state.balance > 0 ? state.balance - action.payload : state.balance,
      };
    case "loan":
      if (state.loan !== 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };
    case "closeAccount":
      return {
        ...state,
        isOpen: state.balance === 0 ? false : state.isOpen,
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div className="App">
        <h1>useReducer Bank Account</h1>
        <p>Balance: {state.balance}</p>
        <p>Loan: {state.loan}</p>

        <p>
          <button
            onClick={() => dispatch({ type: "openAccount" })}
            disabled={state.isOpen}
          >
            Open account
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "deposit", payload: 150 })}
            disabled={!state.isOpen}
          >
            Deposit 150
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "widthraw", payload: 50 })}
            disabled={!state.isOpen}
          >
            Withdraw 50
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "loan", payload: 5000 })}
            disabled={!state.isOpen}
          >
            Request a loan of 5000
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "payLoan" })}
            disabled={!state.isOpen}
          >
            Pay loan
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "closeAccount" })}
            disabled={!state.isOpen}
          >
            Close account
          </button>
        </p>
      </div>
    </>
  );
}

export default App;
