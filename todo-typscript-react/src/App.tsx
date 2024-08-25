import { useState } from "react";
import { TodosType } from "./model";
import Todobox from "./components/TodoBox";
import Button from "./components/Button";

const initialTodos = [
  {
    todo: "Learn React JS",
    id: 1,
    done: false,
    isEditing: false,
  },
  {
    todo: "Learn Python",
    id: 2,
    done: false,
    isEditing: false,
  },
  {
    todo: "Learn DSA",
    id: 3,
    done: false,
    isEditing: false,
  },
];

function App() {
  const [todos, setTodos] = useState<TodosType[]>(initialTodos);

  function handleAddTodo(newTodo: TodosType): void {
    setTodos((todo) => [...todo, newTodo]);
  }

  function handleToggleTodo(id: number): void {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function handleDeleteTodo(id: number): void {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="container">
      <h1>To-Do React</h1>
      <InputTodo onAddTodos={handleAddTodo} />
      <Todobox
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

interface InputTodoProps {
  onAddTodos: (newTodo: TodosType) => void;
}

function InputTodo({ onAddTodos }: InputTodoProps) {
  const [todo, setTodo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newTodo: TodosType = {
      todo,
      done: false,
      id: Date.now(),
      isEditing: false,
    };

    onAddTodos(newTodo);
    setTodo("");
  }

  return (
    <form className="input-box" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button>App</Button>
    </form>
  );
}

export default App;
