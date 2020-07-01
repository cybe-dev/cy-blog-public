import React from "react";

const TitleTag = (props) => {
  return (
    <div className="flex items-center mb-3">
      <div className="bg-light-200 rounded-md py-1 px-3 roboto font-bold text-dark-500 text-sm w-auto">
        {props.title}
      </div>
      <div className="h-1 bg-light-200 w-full ml-1"></div>
    </div>
  );
};

export default TitleTag;
