import React from "react";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";
import { withRouter } from "react-router-dom";
import { PostList, TitleTag } from "../../components";

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      name: "",
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const getThis = this;
    const slug = getThis.props.match.params.slug;

    getThis.props.loader(true);

    Axios.get(backendBaseUrl + "public/category/" + slug)
      .then(function (response) {
        console.log(response.data);

        getThis.props.loader(false);

        getThis.setState({
          posts: response.data.data.posts,
          name: response.data.data.name,
        });
        getThis.props.options({
          pageTitle: response.data.data.name,
          showLayout: true,
        });
      })
      .catch(function (error) {
        console.log(error.response);

        getThis.props.loader(false);
      });
  };

  render() {
    const { posts, name } = this.state;
    const found = posts.length;
    return (
      <React.Fragment>
        <TitleTag title={name} />
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

export default withRouter(Category);
