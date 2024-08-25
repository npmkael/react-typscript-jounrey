import Button from "./Button";
import { TodosType } from "../model";

interface Props {
  info: TodosType;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export default function Todo({ info, onToggleTodo, onDeleteTodo }: Props) {
  console.log(info);

  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={info.done}
        onChange={() => onToggleTodo(info.id)}
      />
      <span style={{ textDecoration: info.done ? "line-through" : "" }}>
        {info.todo}
      </span>
      <Button>Edit</Button>
      <Button onClick={() => onDeleteTodo(info.id)}>Delete</Button>
    </div>
  );
}
