import React from "react";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";
import { withRouter, Link, Redirect } from "react-router-dom";
import {
  EntypoUser,
  EntypoCalendar,
  EntypoFacebook,
  EntypoTwitter,
  EntypoPaperPlane,
  EntypoCircularGraph,
} from "react-entypo-icons";
import { TitleTag, Alert, CommentList } from "../../components";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      newComment: {
        name: "",
        email: "",
        body: "",
      },
      disabledButton: false,
      error: null,
      loaderPost: false,
      redirect404: false,
    };

    this.getData = this.getData.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  sendComment = () => {
    const getThis = this;
    const { data, newComment } = this.state;

    getThis.setState({ disabledButton: true, loaderPost: true });

    if (data) {
      Axios.post(backendBaseUrl + "comment", {
        name: newComment.name,
        email: newComment.email,
        body: newComment.body,
        postId: data.id,
      })
        .then(function (response) {
          console.log(response.data);

          const updateForm = newComment;
          updateForm.body = "";

          getThis.setState({
            newComment: updateForm,
            disabledButton: false,
            error: null,
            loaderPost: false,
          });

          getThis.getData();
        })
        .catch(function (error) {
          console.log(error.response);
          getThis.setState({
            disabledButton: false,
            error: error.response.data.message,
            loaderPost: false,
          });
        });
    }
  };

  getData = () => {
    const getThis = this;
    const slug = getThis.props.match.params.slug;

    getThis.props.loader(true);

    Axios.get(backendBaseUrl + "public/post/" + slug)
      .then(function (response) {
        console.log(response.data);

        getThis.props.loader(false);

        getThis.setState({
          data: response.data.data,
        });
        getThis.props.options({
          pageTitle: response.data.data.title,
          showLayout: true,
        });
      })
      .catch(function (error) {
        console.log(error.response);

        getThis.props.loader(false);
        const statusCode = error.response ? error.response.status : false;

        if (statusCode == 404) {
          getThis.setState({ redirect404: true });
        }
      });
  };

  render() {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const { data, newComment, error, loaderPost, redirect404 } = this.state;
    let date = data ? new Date(data.createdAt) : new Date();

    let comments = [];
    if (data) {
      comments = data.comments && data.comments;
    }

    const displayLoader = loaderPost ? "flex" : "hidden";
    if (redirect404) {
      return <Redirect to="/404" />;
    }
    return (
      <React.Fragment>
        <div
          className={`bg-black fixed top-0 left-0 right-0 h-screen bg-opacity-75 ${displayLoader} items-center justify-center`}
        >
          <div className="bg-white flex flex-col w-2/3 lg:w-1/4 items-center justify-center h-32 rounded-lg">
            <EntypoCircularGraph className="mr-3 rotation text-4xl mb-3" />
            <p className="roboto text-lg">Please Wait...</p>
          </div>
        </div>
        <div>
          <div>
            <div className="mb-5 mt-3">
              <ul className="flex">
                <li className="text-dark-400 uppercase text-sm breadcrumb-list">
                  <Link to="/" className="hover:text-primary-lighter">
                    Home
                  </Link>
                </li>
                {data && data.category && (
                  <li className="text-dark-400 uppercase text-sm breadcrumb-list">
                    <Link
                      to={`/category/${data.category.slug}`}
                      className="hover:text-primary-lighter"
                    >
                      {data.category.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-dark-500 roboto">
              {data && data.title}
            </h1>
            <div className="flex text-sm text-dark-300">
              <span className="flex items-center mr-4">
                <EntypoUser className="mr-1" /> {data && data.author.name}
              </span>
              <span className="flex items-center mr-4">
                <EntypoCalendar className="mr-1" />
                {date.getDate() +
                  " " +
                  month[date.getMonth()] +
                  " " +
                  date.getFullYear()}
              </span>
            </div>
          </div>
          <div
            className="mt-4 text-dark-500"
            dangerouslySetInnerHTML={{ __html: data && data.body }}
          ></div>
          <div className="flex h-12 mt-5">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              className="w-full h-full bg-facebook-200 hover:bg-facebook-100 flex items-center justify-center text-light-100 text-xl"
            >
              <EntypoFacebook />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${
                data && data.title
              }&url=${window.location.href}`}
              className="w-full h-full bg-twitter-200 hover:bg-twitter-100 flex items-center justify-center text-light-100 text-xl"
            >
              <EntypoTwitter />
            </a>
          </div>
          <div className="my-5">
            <TitleTag title="Comments" />
            <div className="flex flex-col text-sm mx-3 mb-5 pb-5 border-b border-light-200 text-dark-600">
              {error && <Alert color="red" body={error} />}
              <label>Name</label>
              <input
                type="text"
                className="w-full border border-light-300 focus:border-dark-300 py-1 px-3 mb-2"
                value={newComment.name}
                onChange={(e) => {
                  const wrap = newComment;
                  wrap.name = e.target.value;
                  this.setState({ newComment: wrap });
                }}
              />
              <label>Email</label>
              <input
                type="text"
                className="w-full border border-light-300 focus:border-dark-300 py-1 px-3 mb-2"
                value={newComment.email}
                onChange={(e) => {
                  const wrap = newComment;
                  wrap.email = e.target.value;
                  this.setState({ newComment: wrap });
                }}
              />
              <label>Comment</label>
              <textarea
                className="w-full h-20 border border-light-300 focus:border-dark-300 p-3"
                value={newComment.body}
                onChange={(e) => {
                  const wrap = newComment;
                  wrap.body = e.target.value;
                  this.setState({ newComment: wrap });
                }}
              />
              <button
                type="button"
                className="bg-primary-lighter py-1 px-5 ml-auto mt-2 text-light-100 flex items-center"
                onClick={() => {
                  this.sendComment();
                }}
              >
                <EntypoPaperPlane className="mr-2" />
                Send
              </button>
            </div>
            <div className="mx-3">
              {comments.map((item, index) => {
                const dateComment = new Date(item.createdAt);
                return (
                  <CommentList
                    key={index}
                    name={item.name}
                    date={
                      dateComment.getDate() +
                      " " +
                      month[dateComment.getMonth()] +
                      " " +
                      dateComment.getFullYear()
                    }
                  >
                    {item.body}
                  </CommentList>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SinglePost);
