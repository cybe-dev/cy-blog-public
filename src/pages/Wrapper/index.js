import React from "react";
import { withRouter } from "react-router-dom";

const Wrapper = (props) => {
  const slug = props.match.params.slug;
  return React.cloneElement(React.Children.only(props.children), {
    key: slug + props.prefix,
    options: props.options,
    loader: props.loader,
  });
};

export default withRouter(Wrapper);
