import React from "react";
import { Route, Switch } from "react-router";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./shared/Layout";
import MyCards from './pages/MyCards';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/mycards" component={MyCards} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
