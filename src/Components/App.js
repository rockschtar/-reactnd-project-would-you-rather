import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../Actions/Global'
import Home from './Home'
import Navigation from './Navigation'
import ProtectedRoute from './ProtectedRoute'
import AddQuestion from './AddQuestion'
import QuestionCardPoll from './QuestionCardPoll'
import NotFound from './NotFound'
import LeaderBoard from './LeaderBoard'
import { Container } from 'semantic-ui-react'

class App extends Component {
  componentDidMount () {
    this.props.handleInitialData()
  }

  render () {
    return (
      <Router>
        <LoadingBar/>
        <Container style={{ paddingTop: '1em', width: '700px' }}>
          {this.props.isLoading
            ? <span>Please wait, loading data</span>
            : <Fragment>
              <Navigation/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <ProtectedRoute exact path="/add" component={AddQuestion}/>
                <ProtectedRoute exact path="/leaderboard" component={LeaderBoard}/>
                <ProtectedRoute path="/questions/:question_id" component={QuestionCardPoll}/>
                <Route component={NotFound}/>
              </Switch>

            </Fragment>
          }
        </Container>
      </Router>

    )
  }
}

export default connect(({ isLoading }) => {
  return { isLoading }
}, { handleInitialData })(App)
