import React, { Children, isValidElement, cloneElement } from "react";
import { EntypoCross } from "react-entypo-icons";
import { Link } from "react-router-dom";

const Parent = (props) => {
  const childrenWithProps = Children.map(props.children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, {
        toggle: props.toggle,
      });
    }

    return child;
  });
  const menuDisplay = props.show ? "block" : "hidden";
  return (
    <div
      className={
        "fixed " +
        menuDisplay +
        " top-0 left-0 right-0 min-h-screen lg:static lg:block lg:top-auto lg:left-0 lg:right-auto lg:min-h-0 bg-light-100 lg:bg-transparent"
      }
    >
      <div className="bg-dark-200 mb-5 flex lg:hidden items-center p-5 text-light-300">
        <button
          type="button"
          className="bg-dark-800 text-light-100 pt-1 rounded-full h-8 w-8 mr-3"
          onClick={() => {
            props.toggle();
          }}
        >
          <EntypoCross />
        </button>
        TUTUP
      </div>
      <ul className="block lg:flex">{childrenWithProps}</ul>
    </div>
  );
};

const List = (props) => {
  return (
    <li
      className="text-dark-700 lg:text-light-100 ml-5 uppercase text-sm hover:underline-animation hover:text-primary-lighter lg:hover:text-light-100"
      style={{ paddingTop: 5, paddingBottom: 5 }}
    >
      <Link
        to={props.to}
        onClick={() => {
          props.toggle();
        }}
      >
        {props.title}
      </Link>
    </li>
  );
};

export { Parent, List };
