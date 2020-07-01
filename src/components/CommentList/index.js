import React from "react";

const CommentList = (props) => {
  return (
    <div className="border border-light-300 rounded-sm p-2 mb-3">
      <div className="text-dark-500 flex flex-wrap items-end p-3 border-b border-light-200">
        <div className="font-bold mr-2">{props.name}</div>
        <div className="text-sm">on {props.date}</div>
      </div>
      <div className="text-dark-500 p-3">{props.children}</div>
    </div>
  );
};

export default CommentList;
