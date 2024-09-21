import React from "react";

type Props = {
  children: React.ReactNode;
};

const Page = ({ children }: Props) => {
  return <main className="main">{children}</main>;
};

export default Page;
