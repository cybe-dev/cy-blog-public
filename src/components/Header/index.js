import React from "react";

const Header = (props) => {
  return (
    <div
      className="flex items-center justify-between bg-primary-lighter fixed top-0 right-0 left-0 px-5 lg:px-16 shadow-md"
      style={{ height: 56 }}
    >
      {props.children}
    </div>
  );
};

export default Header;
