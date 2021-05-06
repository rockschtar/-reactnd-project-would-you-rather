import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import { Link, withRouter } from 'react-router-dom';

class QuestionsTabs extends Component {
    TAB_ANSWERED = 'answered';
    TAB_UNANSWERED = 'unanswered';

    state = {
        tab: 'unanswered',
    };

    selectTab = (tab) => {
        this.setState({ tab: tab });
    };

    render() {

        const { tab } = this.state;
        const { authenticateUser, questions } = this.props;

        const questionArray = Object.keys(questions).map((key) => questions[key]);
        const answeredQuestions = questionArray.filter(
          question => question.optionOne.votes.includes(authenticateUser) ||
            question.optionTwo.votes.includes(authenticateUser));
        const unansweredQuestions = questionArray.filter(
          question => !question.optionOne.votes.includes(authenticateUser) &&
            !question.optionTwo.votes.includes(authenticateUser));

        return (
          <Fragment>
              <ul className="tab tab-block">
                  <li className="tab-item">
                      <Link to="/" className={tab === this.TAB_UNANSWERED ? 'active' : ''}
                            onClick={() => this.selectTab(this.TAB_UNANSWERED)}>Unanswered Questions</Link>
                  </li>
                  <li className="tab-item">

                      <Link to="/" className={tab === this.TAB_ANSWERED ? 'active' : ''}
                            onClick={() => this.selectTab(this.TAB_ANSWERED)}>Answered Questions</Link>
                  </li>
              </ul>

              {tab === this.TAB_UNANSWERED && <div>
                  <QuestionList questions={unansweredQuestions}/>
              </div>}


              {tab === this.TAB_ANSWERED && <div>
                  <QuestionList questions={answeredQuestions}/>
              </div>}

          </Fragment>

        );
    }

}

function mapStateToProps({ questions, authenticateUser }) {

    return {
        questions : Object.keys(questions).map((key) => questions[key]).sort((a,b) => b.timestamp - a.timestamp),
        authenticateUser,
    };
}

export default withRouter(connect(mapStateToProps)(QuestionsTabs));