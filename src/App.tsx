import React from "react";
import { Route, Switch } from "react-router";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./shared/Layout";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
