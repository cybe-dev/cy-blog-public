import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
  useEffect(() => {
    props.options({ pageTitle: "Page Not Found", showLayout: false });
  }, []);
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-6xl roboto bg-dark-500 text-white">404</div>
        <div className="mt-2 text-xl">PAGE NOT FOUND</div>
        <Link to="/" className="mt-3 pt-3 border-t text-primary-lighter">
          Go to homepage
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
