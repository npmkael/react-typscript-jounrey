import Button from "./Button";
import { TodosType } from "../model";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

interface Props {
  info: TodosType;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, updated: string) => void;
}

export default function Todo({
  info,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={info.done}
        onChange={() => onToggleTodo(info.id)}
      />
      {!isEditing ? (
        <>
          <span style={{ textDecoration: info.done ? "line-through" : "" }}>
            {info.todo}
          </span>
          <Button onClick={() => setIsEditing((edit) => !edit)}>
            <FaEdit />
          </Button>
          <Button onClick={() => onDeleteTodo(info.id)}>
            <FaTrashCan />
          </Button>
        </>
      ) : (
        <>
          <input
            value={info.todo}
            onChange={(e) => onEditTodo(info.id, e.target.value)}
          />
          <Button onClick={() => setIsEditing(false)}>Change</Button>
        </>
      )}
    </div>
  );
}
