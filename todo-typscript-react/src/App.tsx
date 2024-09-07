import { useState, useEffect } from "react";
import { TodosType } from "./model";
import Todobox from "./components/TodoBox";
import Button from "./components/Button";
import { CiCirclePlus } from "react-icons/ci";

function App() {
  const [todos, setTodos] = useState<TodosType[]>(() => {
    const storedValue = localStorage.getItem("todo");
    return storedValue === null ? [] : JSON.parse(storedValue);
  });

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

  function handleEditTodo(id: number, updated: string): void {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, todo: updated } : todo))
    );
  }

  function handleDeleteTodo(id: number): void {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("todo", JSON.stringify(todos));
    },
    [todos]
  );

  return (
    <div className="container">
      <h1>To-Do React</h1>
      <InputTodo onAddTodos={handleAddTodo} />
      <Todobox
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
        onEditTodo={handleEditTodo}
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
      {/* <Button>Add</Button> */}
    </form>
  );
}

export default App;
