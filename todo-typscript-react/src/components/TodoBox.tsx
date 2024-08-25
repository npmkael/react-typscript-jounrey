import Todo from "./Todo";
import { TodosType } from "../model";

interface Props {
  todos: TodosType[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export default function TodoBox({ todos, onToggleTodo, onDeleteTodo }: Props) {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <Todo
          info={todo}
          key={todo.id}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}
