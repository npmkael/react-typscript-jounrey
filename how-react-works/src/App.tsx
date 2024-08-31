import { useState } from "react";

const content = [
    {
        summary: "React is a library for building UIs",
        details:
            "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        summary: "State management is like giving state a home",
        details:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        summary: "We can think of props as the component API",
        details:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
];

function App() {
    return (
        <div>
            <Tabbed content={content} />
        </div>
    );
}

type Content = {
    summary: string;
    details: string;
};

interface TabbedProps {
    content: Content[];
}

function Tabbed({ content }: TabbedProps) {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <div>
            <div className="tabs">
                <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
                <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
            </div>

            {activeTab <= 2 ? (
                // content[activeTab] => content[0]
                <TabContent item={content.at(activeTab)!} />
            ) : (
                <DifferentContent />
            )}
        </div>
    );
}

interface TabProps {
    num: number;
    activeTab: number;
    onClick: React.Dispatch<React.SetStateAction<number>>;
}

function Tab({ num, activeTab, onClick }: TabProps) {
    return (
        <button
            className={activeTab === num ? "tab active" : "tab"}
            onClick={() => onClick(num)}
        >
            Tab {num + 1}
        </button>
    );
}

interface TabContentProps {
    item: Content;
}

function TabContent({ item }: TabContentProps) {
    const [showDetails, setShowDetails] = useState<boolean>(true);
    const [likes, setLikes] = useState<number>(0);

    function handleInc() {
        setLikes(likes + 1);
    }

    return (
        <div className="tab-content">
            <h4>{item.summary}</h4>
            {showDetails && <p>{item.details}</p>}

            <div className="tab-actions">
                <button onClick={() => setShowDetails((h) => !h)}>
                    {showDetails ? "Hide" : "Show"} details
                </button>

                <div className="hearts-counter">
                    <span>{likes} ❤️</span>
                    <button onClick={handleInc}>+</button>
                    <button>+++</button>
                </div>
            </div>

            <div className="tab-undo">
                <button>Undo</button>
                <button>Undo in 2s</button>
            </div>
        </div>
    );
}

function DifferentContent() {
    return (
        <div className="tab-content">
            <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
        </div>
    );
}

export default App;
