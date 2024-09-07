import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const initialTodos = [
  {
    title: "play apex",
    description:
      "will play with friends later at some point cause I have busy friends...",
  },
  {
    title: "coding session",
    description: "will code later since i'm an asshole...",
  },
  {
    title: "watch the frog",
    description: "go minsi is so hot...",
  },
];

type TodoType = {
  title: string;
  description: string;
};

function App() {
  const [todo, setTodos] = useState<TodoType[]>(initialTodos);
  const [active, setIsAcive] = useState<number>(0);

  return (
    <>
      <div className="todo-container">
        <div className="navbar">
          <Button
            className={active === 0 ? "home btn active" : "home btn"}
            onClick={() => setIsAcive(0)}
          >
            Home
          </Button>
          <Button
            className={active === 1 ? "todo btn active" : "todo btn"}
            onClick={() => setIsAcive(1)}
          >
            Todo
          </Button>
          <span className="todo-counter">{todo.length}</span>
        </div>
        <div className={active === 1 ? "line left" : "line"}></div>
      </div>
      <div className="main-container">
        {active === 1 ? (
          <>
            {todo.map((todo) => (
              <Todo title={todo.title} description={todo.description} />
            ))}
            <div className="add-btn-container">
              <Button className="add-todo-btn">
                <FaPencilAlt color="white" />
              </Button>
            </div>
          </>
        ) : (
          <p>home</p>
        )}
      </div>
      <div className="sample-container"></div>
    </>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
};

function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={className}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}

function Todo({ title, description }: TodoType) {
  return (
    <>
      <div className="todo-wrapper">
        <input type="checkbox" />
        <div className="todo-info">
          <p className="title">{title}</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </>
  );
}

export default App;
