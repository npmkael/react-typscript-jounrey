import React from "react";

type Props = {
  options: string[];
};

const Options = ({ options }: Props) => {
  return (
    <div className="options">
      {options.map((option) => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
