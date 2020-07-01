import React from "react";
import "./tailwind/tailwind.css";
import { Layout, Home, Category, Wrapper, SinglePost, NotFound } from "./pages";
import { Route, BrowserRouter as Router } from "react-router-dom";
import HomeWrapper from "./pages/HomeWrapper";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/category/:slug">
          <Wrapper prefix="category-">
            <Category />
          </Wrapper>
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route path="/:slug">
          <Wrapper>
            <SinglePost />
          </Wrapper>
        </Route>
        <Route path="/" exact>
          <HomeWrapper>
            <Home />
          </HomeWrapper>
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
