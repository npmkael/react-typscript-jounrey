import { useState } from "react";

function App() {
  return (
    <div>
      <TextExpander
        collapsedNumWords={10}
        collapseButtonText="Show Less"
        expandButtonText="Show More"
        buttonColor="yellow"
      >
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>
      <TextExpander
        collapsedNumWords={20}
        collapseButtonText="Collapse Text"
        expandButtonText="Show Text"
        buttonColor="blue"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>
      <TextExpander
        collapsedNumWords={10}
        collapseButtonText="Show Less"
        expandButtonText="Show More"
        buttonColor="blue"
        className="box"
      >
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

interface Props {
  children: string;
  collapsedNumWords: number;
  expandButtonText: string;
  collapseButtonText: string;
  buttonColor: string;
  className?: string;
}

function TextExpander({
  children,
  collapsedNumWords,
  expandButtonText,
  collapseButtonText,
  buttonColor,
  className = "",
}: Props) {
  console.log(Math.floor(children.length / 3));
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className={className}>
      <span>
        {isCollapsed
          ? children
          : children.split(" ").slice(0, collapsedNumWords).join(" ") + "..."}
      </span>
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setIsCollapsed((collapsed) => !collapsed)}
      >
        {isCollapsed ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}

export default App;
