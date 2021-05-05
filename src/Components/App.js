import Navigation from './Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { handleInitialData } from '../Actions/Global';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import AddQuestion from './AddQuestion';

import './../App.css'
import { NotFound } from './NotFound';

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }

    render() {
        return (
          <div className="container grid-md">
              <Router>
                  <Navigation/>
                  <Switch>
                      <Route exact path="/" component={Home}/>
                      <ProtectedRoute path="/add-question" component={AddQuestion}/>
                      <Route component={NotFound} />
                  </Switch>


              </Router>
          </div>
        );
    }

}

function mapStateToProps({ authenticateUser }) {
    return {
        authenticateUser,
    };
}

export default connect(mapStateToProps, { handleInitialData })(App);

