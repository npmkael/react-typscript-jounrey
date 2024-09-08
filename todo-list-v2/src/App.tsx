import { useState } from "react";
import { BsPlus } from "react-icons/bs";

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

    function handleAddTodo(newTodo: TodoType): void {
        setTodos((todo) => [...todo, newTodo]);
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
                                <Todo todo={todo} key={todo.id} />
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

            <div className="main-todo-wrapper">
                <div>
                    <p>title</p>
                    <p>description</p>
                </div>
            </div>
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
};

function Todo({ todo }: TodoProps) {
    return (
        <>
            <div className="todo-wrapper">
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

export default App;
