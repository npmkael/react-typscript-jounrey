import React from "react";

interface Props {
  children: React.ReactNode;
}

const NavBar = ({ children }: Props) => {
  return <nav className="nav-bar">{children}</nav>;
};

export default NavBar;
