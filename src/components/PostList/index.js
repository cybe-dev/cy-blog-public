import React from "react";
import { EntypoUser, EntypoCalendar } from "react-entypo-icons";
import { Link } from "react-router-dom";

const PostList = (props) => {
  const date = new Date(props.date);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="border border-light-200 rounded-sm p-3 mb-5">
      <div>
        <Link
          to={"/" + props.slug}
          className="text-lg font-bold text-dark-500 hover:text-primary-darker roboto"
        >
          {props.title}
        </Link>
      </div>
      <div className="text-dark-400 mt-3 text-sm">{props.children}</div>
      <div className="mt-3 pt-3 flex flex-col lg:flex-row border-t border-light-200">
        <div className="text-sm text-dark-300 flex items-center mb-2 lg:mb-0 lg:mr-5 w-full lg:w-auto">
          <EntypoUser className="mr-1" /> {props.author}
        </div>
        <div className="text-sm text-dark-300 flex items-center w-full lg:w-auto">
          <EntypoCalendar className="mr-1" />{" "}
          {date.getDate() +
            " " +
            month[date.getMonth()] +
            " " +
            date.getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default PostList;
