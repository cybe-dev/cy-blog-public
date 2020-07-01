import React from "react";

const Footer = (props) => {
  return (
    <div className="bg-dark-300 flex items-center justify-center text-light-100 border-t-2 border-dark-400 mt-auto py-3">
      {props.children}
    </div>
  );
};

export default Footer;
