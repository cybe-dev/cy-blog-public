import React from "react";
import { EntypoCross } from "react-entypo-icons";
import { withRouter } from "react-router-dom";

const SearchForm = (props) => {
  const searchbarDisplay = props.show ? "flex" : "hidden";
  return (
    <div
      className={
        "bg-dark-900 fixed top-0 left-0 right-0 h-screen z-50 bg-opacity-75 " +
        searchbarDisplay +
        " items-center justify-center flex-col"
      }
    >
      <button
        type="button"
        className="text-3xl text-light-100"
        onClick={() => {
          props.toggle();
        }}
      >
        <EntypoCross />
      </button>
      <input
        type="text"
        className="bg-transparent text-center text-3xl border-t border-b border-light-100 w-3/4 lg:w-1/3 text-light-100"
        placeholder="Cari blog ini"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            props.toggle();
            props.history.push(`/?q=${encodeURIComponent(e.target.value)}`);
          }
        }}
      />
    </div>
  );
};

export default withRouter(SearchForm);
