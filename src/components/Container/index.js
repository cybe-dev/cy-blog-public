import React from "react";

const Wrapper = (props) => {
  return (
    <div
      className="mx-5 lg:mx-16 bg-light-200 flex flex-col lg:flex-row mb-6"
      style={{ marginTop: 56 }}
    >
      {props.children}
    </div>
  );
};

const Content = (props) => {
  return (
    <div className="bg-light-100 w-full lg:w-2/3 p-5">{props.children}</div>
  );
};

const Sidebar = (props) => {
  return <div className="w-full lg:w-1/3">{props.children}</div>;
};

export { Wrapper, Content, Sidebar };
