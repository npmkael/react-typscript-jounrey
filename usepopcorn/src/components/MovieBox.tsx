import React from "react";

interface Props {
  children: React.ReactNode;
}

const MovieBox = ({ children }: Props) => {
  return <main className="main">{children}</main>;
};

export default MovieBox;
