import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

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
    const [active, setIsAcive] = useState<number>(0);
    const [toggleTask, setToggleTask] = useState<boolean>(false);
    const [isTodoOpen, setIsTodoOpen] = useState<boolean>(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [isEditing, setIsEditing] = useState(false);

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

    function handleSetEditing() {
        setIsEditing((edit) => !edit);
    }

    function handleEditTodo(id: string, title: string, description: string) {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, title, description } : todo
            )
        );
    }

    return (
        <>
            <div className="todo-container">
                {/* extract these to components */}
                <div className="navbar">
                    <Button
                        className={
                            active === 0 ? "home btn active" : "home btn"
                        }
                        onClick={() => {
                            setIsAcive(0);
                            setToggleTask(false);
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        className={
                            active === 1 ? "todo btn active" : "todo btn"
                        }
                        onClick={() => {
                            setIsAcive(1);
                            setToggleTask(false);
                        }}
                    >
                        Todo
                    </Button>
                    <span className="todo-counter">{todo.length}</span>
                </div>
                <div className="main-container">
                    {active === 1 ? (
                        <>
                            {todo.map((todo) => (
                                <Todo
                                    todo={todo}
                                    key={todo.id}
                                    onHandleShowTodo={handleShowTodo}
                                />
                            ))}
                            <div className="add-btn-container">
                                <Button
                                    className="add-todo-btn"
                                    onClick={() =>
                                        setToggleTask((toggle) => !toggle)
                                    }
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
                        </>
                    ) : (
                        <p>home</p>
                    )}
                </div>
            </div>

            {isTodoOpen ? (
                <ShowTodo
                    title={title}
                    description={description}
                    onHandleEditing={handleSetEditing}
                    isEditing={isEditing}
                    onHandleEditTodo={handleEditTodo}
                    onSetTitle={setTitle}
                    onSetDescription={setDescription}
                    id={id}
                />
            ) : (
                ""
            )}
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

type TodoProps = {
    todo: TodoType;
    onHandleShowTodo: (title: string, description: string, id: string) => void;
};

function Todo({ todo, onHandleShowTodo }: TodoProps) {
    return (
        <>
            <div
                className="todo-wrapper"
                onClick={() =>
                    onHandleShowTodo(todo.title, todo.description, todo.id)
                }
            >
                <input type="checkbox" />
                <div className="todo-info">
                    <p className="title">{todo.title}</p>
                    <p className="description">{todo.description}</p>
                </div>
            </div>
        </>
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
            className={
                toggleTask ? "sample-container active" : "sample-container"
            }
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
                <button
                    className="btn cancel"
                    onClick={() => onSetToggle(false)}
                >
                    Cancel
                </button>
                <button className="btn add" type="submit">
                    Add
                </button>
            </div>
        </form>
    );
}

type ShowTodoProps = {
    title: string;
    description: string;
    onHandleEditing: () => void;
    isEditing: boolean;
    onHandleEditTodo: (id: string, title: string, description: string) => void;
    onSetTitle: React.Dispatch<React.SetStateAction<string>>;
    onSetDescription: React.Dispatch<React.SetStateAction<string>>;
    id: string;
};

function ShowTodo({
    title,
    description,
    onHandleEditing,
    isEditing,
    onHandleEditTodo,
    onSetTitle,
    onSetDescription,
    id,
}: ShowTodoProps) {
    return (
        <div className="main-todo-wrapper">
            <div>
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        className="edit-title"
                        onChange={(e) => onSetTitle(e.target.value)}
                    />
                ) : (
                    <p className="title">{title}</p>
                )}
                <p>{description}</p>
            </div>
            <div className="edit-wrapper">
                {!isEditing ? (
                    <button onClick={() => onHandleEditing()}>
                        <MdEdit color="black" size={20} />
                    </button>
                ) : (
                    <div className="confirm-buttons">
                        <button
                            onClick={() => {
                                onHandleEditTodo(id, title, description);
                                onHandleEditing();
                            }}
                        >
                            Ok
                        </button>
                        <button>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
