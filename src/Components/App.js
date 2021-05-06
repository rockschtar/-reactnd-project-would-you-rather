import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../Actions/Global';
import Home from './Home';
import Navigation from './Navigation';
import ProtectedRoute from './ProtectedRoute';
import AddQuestion from './AddQuestion';
import { NotFound } from './NotFound';
import QuestionCardPoll from './QuestionCardPoll';
import './../App.css';

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }

    render() {
        return (
          <Router>
              <LoadingBar/>
              <div className="container grid-md">
                  {this.props.isLoading
                    ?
                    <span>Please wait, loading data</span>
                    :
                    <Fragment>
                        <Navigation/>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <ProtectedRoute path="/add-question" component={AddQuestion}/>
                            <ProtectedRoute path="/questions/:question_id" component={QuestionCardPoll}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Fragment>
                  }
              </div>
          </Router>

        );
    }
}

export default connect(({ isLoading }) => {return { isLoading };}, { handleInitialData })(App);

