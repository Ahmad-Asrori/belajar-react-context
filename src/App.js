import React from 'react';
import Navbar from './component/layout/Navbar';
import Alert from "./component/layout/Alert";
import User from "./component/users/User";
import Home from "./component/Home";
import About from "./component/pages/About";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import NotFound from "./component/pages/NotFound";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div>
            <Navbar/>
            <div className='container' align={'center'}>
              <Alert/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login' component={User}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
