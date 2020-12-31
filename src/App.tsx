import React from "react";
import { Route, Switch } from "react-router";
import MainPage from "./pages/MainPage";
import Layout from "./shared/Layout"

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={MainPage}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
