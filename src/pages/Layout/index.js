import React from "react";
import {
  EntypoMagnifyingGlass,
  EntypoMenu,
  EntypoLocationPin,
  EntypoInstagram,
  EntypoFacebook,
  EntypoPhone,
} from "react-entypo-icons";
import {
  Navbar,
  MainContainer,
  SearchForm,
  Header,
  Container,
  Footer,
  Loader,
} from "../../components";
import Axios from "axios";
import { backendBaseUrl } from "../../setting";
import { Helmet } from "react-helmet";
import { Switch, Link } from "react-router-dom";

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchToggle: false,
      menuToggle: false,
      blogName: "",
      pageTitle: "",
      category: [],
      loader: false,
      showLayout: true,
    };

    this.searchToggle = this.searchToggle.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
    this.loaderToggle = this.loaderToggle.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.setOptions = this.setOptions.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  searchToggle = () => {
    this.setState({ searchToggle: !this.state.searchToggle });
  };

  menuToggle = () => {
    this.setState({ menuToggle: !this.state.menuToggle });
  };

  setOptions = ({ pageTitle, showLayout }) => {
    this.setState({ pageTitle, showLayout });
  };

  loaderToggle = (loader) => {
    this.setState({ loader });
  };

  getInfo = () => {
    const getThis = this;

    Axios.get(backendBaseUrl + "public/blog-info")
      .then(function (response) {
        console.log(response.data);

        const { blogName } = response.data.data;

        getThis.setState({ blogName });
      })
      .catch(function (error) {
        console.log(error);
      });
    Axios.get(backendBaseUrl + "public/category")
      .then(function (response) {
        console.log(response.data);

        getThis.setState({ category: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const {
      searchToggle,
      menuToggle,
      blogName,
      pageTitle,
      category,
      loader,
      showLayout,
    } = this.state;

    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        // Checking isValidElement is the safe way and avoids a TS error too.
        if (React.isValidElement(child)) {
          const childOfChildren = React.Children.map(
            child.props.children,
            (childOfChildrenEach) => {
              if (React.isValidElement(childOfChildrenEach)) {
                return React.cloneElement(childOfChildrenEach, {
                  options: this.setOptions,
                  loader: this.loaderToggle,
                });
              }
              return childOfChildrenEach;
            }
          );
          return React.cloneElement(child, {
            children: childOfChildren,
          });
        }

        return child;
      }
    );

    return (
      <React.Fragment>
        <Helmet>
          <title>{pageTitle ? pageTitle : blogName}</title>
        </Helmet>

        <Loader show={loader} />

        {showLayout ? (
          <MainContainer>
            <SearchForm show={searchToggle} toggle={this.searchToggle} />

            <Header>
              <button
                type="button"
                className="text-3xl w-6 lg:hidden text-light-100 flex items-center"
                onClick={() => {
                  this.menuToggle();
                }}
              >
                <EntypoMenu />
              </button>
              <div className="bebas text-2xl text-light-100 pt-1">
                <Link to="/">{blogName}</Link>
              </div>
              <div className="flex items-center">
                <Navbar.Parent show={menuToggle} toggle={this.menuToggle}>
                  <Navbar.List to="/" title="Home" />

                  {category.map((item, index) => {
                    return (
                      <Navbar.List
                        to={"/category/" + item.slug}
                        title={item.name}
                        key={index}
                      />
                    );
                  })}
                </Navbar.Parent>
                <button
                  type="button"
                  className="text-xl w-6 text-light-100 lg:ml-5 uppercase flex items-center justify-end"
                  onClick={() => {
                    this.searchToggle();
                  }}
                >
                  <EntypoMagnifyingGlass />
                </button>
              </div>
            </Header>

            <Container.Wrapper>
              <Container.Content>
                <Switch>{childrenWithProps}</Switch>
              </Container.Content>
              <Container.Sidebar>
                <div className="mt-16 mb-5 mx-3 p-5 bg-white rounded-lg text-center">
                  <img
                    src="http://akbaraditama.com/upload/akbar_(1).png"
                    className="mx-auto mb-6 h-24 w-24 bg-dark-400 image-cover rounded-full"
                    style={{ marginTop: -56 }}
                  />
                  <div className="text-dark-500 font-bold text-xl">
                    Akbar Aditama
                  </div>
                  <div className="text-dark-300 flex flex-col">
                    <span>Freelance Web Developer</span>
                    <span className="flex justify-center items-center">
                      <EntypoLocationPin /> Palembang, Indonesia
                    </span>
                  </div>
                </div>
                <div className="flex mx-3 mb-3">
                  <a
                    href="https://www.instagram.com/akbaraditamasp/"
                    className="w-full bg-dark-100 hover:bg-dark-200 text-white text-2xl flex items-center justify-center h-10 rounded-tl-md rounded-bl-md"
                    target="_blank"
                  >
                    <EntypoInstagram />
                  </a>
                  <a
                    href="https://web.facebook.com/profile.php?id=100004231035942"
                    className="w-full bg-dark-100 hover:bg-dark-200 text-white text-2xl flex items-center justify-center h-10"
                    target="_blank"
                  >
                    <EntypoFacebook />
                  </a>
                  <a
                    href="tel:+6281271762774"
                    className="w-full bg-dark-100 hover:bg-dark-200 text-white text-2xl flex items-center justify-center h-10 rounded-tr-md rounded-br-md"
                    target="_blank"
                  >
                    <EntypoPhone />
                  </a>
                </div>
              </Container.Sidebar>
            </Container.Wrapper>
            <Footer>&copy; {blogName}</Footer>
          </MainContainer>
        ) : (
          <Switch>{childrenWithProps}</Switch>
        )}
      </React.Fragment>
    );
  }
}

export default Layout;
