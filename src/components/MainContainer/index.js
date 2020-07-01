import React from "react";

const MainContainer = (props) => {
  return (
    <div className="bg-light-300 flex flex-col min-h-screen">
      {props.children}
    </div>
  );
};

export default MainContainer;
