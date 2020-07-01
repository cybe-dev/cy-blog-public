import React from "react";
import { withRouter } from "react-router-dom";

const HomeWrapper = (props) => {
  const query = new URLSearchParams(props.location.search);
  const q = query.get("q");

  return React.cloneElement(React.Children.only(props.children), {
    key: q ? q : "home",
    options: props.options,
    loader: props.loader,
  });
};

export default withRouter(HomeWrapper);
