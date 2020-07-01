import React from "react";
import { PostList } from "../../components";
import Axios from "axios";
import { backendBaseUrl, useQuery } from "../../setting";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };

    this.getPosts = this.getPosts.bind(this);
    this.query = this.query.bind(this);
  }

  componentDidMount() {
    const q = this.query().get("q");

    if (q) {
      this.props.options({
        pageTitle: `Hasil pencarian "${q}"`,
        showLayout: true,
      });
    } else {
      this.props.options({ pageTitle: "", showLayout: true });
    }
    this.getPosts();
  }

  query = () => {
    return new URLSearchParams(this.props.location.search);
  };

  getPosts = () => {
    const getThis = this;

    getThis.props.loader(true);

    const q = getThis.query().get("q");

    const queryRequest = q ? `?q=${encodeURIComponent(q)}` : "";

    Axios.get(backendBaseUrl + "public/post" + queryRequest)
      .then(function (response) {
        console.log(response.data);

        getThis.setState({ posts: response.data.data });
        getThis.props.loader(false);
      })
      .catch(function (error) {
        console.log(error.response);
        getThis.props.loader(false);
      });
  };

  render() {
    const { posts } = this.state;
    const found = posts.length;
    return (
      <React.Fragment>
        {posts.map((item, index) => {
          return (
            <PostList
              key={index}
              title={item.title}
              slug={item.slug}
              author={item.author.name}
              date={item.createdAt}
            >
              {item.body}
            </PostList>
          );
        })}
        {!found && <div className="text-center p-5">Belum ada postingan</div>}
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
