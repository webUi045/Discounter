import React from "react";
import { Route, Switch } from "react-router";
import MainPage from "./pages/MainPage";
import Layout from "./shared/Layout";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/News" exact component={MainPage} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
