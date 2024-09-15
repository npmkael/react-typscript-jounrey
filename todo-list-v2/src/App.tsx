import { useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

const initialTodos = [
  {
    id: "1",
    title: "play apex",
    description:
      "will play with friends later at some point cause I have busy friends...",
    isDone: false,
  },
  {
    id: "2",
    title: "coding session",
    description: "will code later since i'm an asshole...",
    isDone: false,
  },
  {
    id: "3",
    title: "watch the frog",
    description: "go minsi is so hot...",
    isDone: false,
  },
];

type TodoType = {
  title: string;
  description: string;
  isDone: boolean;
  id: string;
};

function App() {
  const [todo, setTodos] = useState<TodoType[]>(initialTodos);
  const [toggleTask, setToggleTask] = useState<boolean>(false);
  const [isTodoOpen, setIsTodoOpen] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleAddTodo(newTodo: TodoType): void {
    setTodos((todo) => [...todo, newTodo]);
  }

  function handleShowTodo(
    title: string,
    description: string,
    id: string
  ): void {
    setTitle(title);
    setDescription(description);
    setId(id);
    setIsTodoOpen((todo) => !todo);
  }

  function handleEditTodo(id: string, title: string, description: string) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
  }

  function handleDeleteTodo(id: string) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <div className="todo-container">
        {/* extract these to components */}
        <div className="navbar">
          <Button
            className="todo btn"
            onClick={() => {
              setToggleTask(false);
            }}
          >
            Todo
          </Button>
          <span className="todo-counter">{todo.length}</span>
        </div>
        <div className="main-container">
          {todo.map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
              onHandleShowTodo={handleShowTodo}
              onSetIsTodoOpen={setIsTodoOpen}
            />
          ))}
          <div className="add-btn-container">
            <Button
              className="add-todo-btn"
              onClick={() => setToggleTask((toggle) => !toggle)}
            >
              <BsPlus color="white" size={30} />
              New Task
            </Button>
          </div>
          <CreateTaskModal
            toggleTask={toggleTask}
            onHandleTodo={handleAddTodo}
            onSetToggle={setToggleTask}
          />
        </div>
      </div>

      {isTodoOpen ? (
        <ShowTodo
          title={title}
          description={description}
          onHandleEditTodo={handleEditTodo}
          onSetTitle={setTitle}
          onSetDescription={setDescription}
          isEditing={isEditing}
          onSetEditing={setIsEditing}
          id={id}
          onSetTodoOpen={setIsTodoOpen}
          onHandleDeleteTodo={handleDeleteTodo}
        />
      ) : (
        ""
      )}
    </>
  );
}

type ModalProps = {
  id: string;
  onHandleDeleteTodo: (id: string) => void;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSetTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({
  id,
  onHandleDeleteTodo,
  setToggleModal,
  onSetTodoOpen,
}: ModalProps) {
  return (
    <div className="modal">
      <div className="background"></div>
      <div className="modal-container">
        <h1>Are you sure want to delete?</h1>
        <div className="buttons">
          <button
            onClick={() => {
              onHandleDeleteTodo(id);
              setToggleModal(false);
              onSetTodoOpen(false);
            }}
          >
            YES
          </button>
          <button
            onClick={() => {
              setToggleModal(false);
            }}
          >
            NO
          </button>
        </div>
      </div>
    </div>
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

type TodoProps = {
  todo: TodoType;
  onHandleShowTodo: (title: string, description: string, id: string) => void;
  onSetIsTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Todo({ todo, onHandleShowTodo, onSetIsTodoOpen }: TodoProps) {
  const [isDone, setIsDone] = useState<boolean>(false);
  return (
    <div className="todos-wrapper">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => {
          setIsDone((done) => !done);
          onSetIsTodoOpen(false);
        }}
      />
      <div
        className="todo-wrapper"
        onClick={() =>
          !isDone ? onHandleShowTodo(todo.title, todo.description, todo.id) : ""
        }
      >
        <div className="todo-info">
          <p
            className="title"
            style={isDone ? { textDecoration: "line-through" } : {}}
          >
            {todo.title}
          </p>
          <p className="description">{todo.description}</p>
        </div>
      </div>
    </div>
  );
}

type CreateTaskModalProps = {
  toggleTask: boolean;
  onHandleTodo: (newTodo: TodoType) => void;
  onSetToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateTaskModal({
  toggleTask,
  onHandleTodo,
  onSetToggle,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function addTodo(e: React.FormEvent) {
    e.preventDefault();

    if (!title && !description) return;

    const newTodo = {
      id: String(Date.now()),
      title,
      description,
      isDone: false,
    };

    onHandleTodo(newTodo);
    setTitle("");
    setDescription("");
    onSetToggle(false);
  }

  return (
    <form
      className={toggleTask ? "sample-container active" : "sample-container"}
      onSubmit={(e) => addTodo(e)}
    >
      <div>
        <input
          type="text"
          placeholder="Task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          name=""
          id=""
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="button-container">
        <Button className="btn cancel" onClick={() => onSetToggle(false)}>
          Cancel
        </Button>
        <Button className="btn add">Add</Button>
      </div>
    </form>
  );
}

type ShowTodoProps = {
  title: string;
  description: string;
  onHandleEditTodo: (id: string, title: string, description: string) => void;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  onSetDescription: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  onSetEditing: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  onSetTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleDeleteTodo: (id: string) => void;
};

function ShowTodo({
  title,
  description,
  onHandleEditTodo,
  onSetTitle,
  onSetDescription,
  isEditing,
  onSetEditing,
  id,
  onSetTodoOpen,
  onHandleDeleteTodo,
}: ShowTodoProps) {
  const previousTodo = useRef<string>(title);
  const previousDescription = useRef<string>(description);

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const isEditingConfirmed = () => {
    if (!isEditing) {
      previousTodo.current = title;
      previousDescription.current = description;
    }
    onSetEditing(!isEditing);
  };

  const saveTodo = () => {
    previousTodo.current = title;
    previousDescription.current = description;
  };

  return (
    <>
      {toggleModal && (
        <Modal
          id={id}
          onHandleDeleteTodo={onHandleDeleteTodo}
          setToggleModal={setToggleModal}
          onSetTodoOpen={onSetTodoOpen}
        />
      )}
      <div className="main-todo-wrapper">
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={title}
                className="edit-title"
                onChange={(e) => onSetTitle(e.target.value)}
              />
              <textarea
                value={description}
                onChange={(e) => onSetDescription(e.target.value)}
                className="text-area-description"
              />
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => onSetTodoOpen(false)}
                  className="close-button"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IoClose size={20} />
                </button>
              </div>
              <p className="title">{title}</p>
              <p className="description">{description}</p>
            </>
          )}
        </div>
        <div className="edit-wrapper">
          {!isEditing ? (
            <div style={{ display: "flex", gap: "16px" }}>
              <button onClick={() => onSetEditing(true)}>
                <MdEdit color="black" size={20} />
              </button>
              <button onClick={() => setToggleModal(true)}>
                <FaTrashCan size={20} />
              </button>
            </div>
          ) : (
            <div className="confirm-buttons">
              <button
                onClick={() => {
                  onHandleEditTodo(id, title, description);
                  saveTodo();
                  isEditingConfirmed();
                }}
              >
                &#10003;
              </button>
              <button
                onClick={() => {
                  onSetTitle(previousTodo.current);
                  onSetDescription(previousDescription.current);
                  isEditingConfirmed();
                }}
              >
                &#10006;
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
