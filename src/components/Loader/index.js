import React from "react";
import { EntypoCircularGraph } from "react-entypo-icons";

const Loader = (props) => {
  const display = props.show ? "flex" : "hidden";
  return (
    <div
      className={`bg-primary-darker rounded-md fixed bottom-0 left-0 m-3 lg:m-5 py-1 px-3 ${display} items-center shadow-lg text-white`}
    >
      <EntypoCircularGraph className="mr-3 rotation" />
      Loading data...
    </div>
  );
};

export default Loader;
