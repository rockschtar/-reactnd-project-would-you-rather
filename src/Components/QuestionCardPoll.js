import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import QuestionCardHeader from './QuestionCardHeader';
import { connect } from 'react-redux';
import { isAnswered } from '../Utils/Helpers';

class QuestionCardPoll extends Component {

    static propTypes = {
        question_id: PropTypes.string,
        question: PropTypes.object.isRequired,
    };

    handleGoBack = () => {

        this.props.history.goBack();

    };

    render() {
        const { question, authenticateUser } = this.props;

        const countVotesOptionOne = question.optionOne.votes.length;
        const countVotesOptionTwo = question.optionTwo.votes.length;
        const countVotesTotal = countVotesOptionOne + countVotesOptionTwo;
        const precentVotesOptionOne = (countVotesOptionOne * 100) / countVotesTotal;
        const precentVotesOptionTwo = (countVotesOptionTwo * 100) / countVotesTotal;
        const userVotedForOptionOne = question.optionOne.votes.includes(authenticateUser);
        const userVotedForOptionTwo = question.optionTwo.votes.includes(authenticateUser);

        return (

          <div className="card text-center">
              <QuestionCardHeader question={question}/>

              {!isAnswered(question, authenticateUser)
                ?
                <Fragment>
                    <div className="card-body">
                        <div className="form-group d-inline-block text-left">
                            <label className="form-radio">
                                <input type="radio" name="gender"/>
                                <i className="form-icon"/> {question.optionOne.text}
                            </label>
                            <label className="form-radio">
                                <input type="radio" name="gender"/>
                                <i className="form-icon"/> {question.optionTwo.text}
                            </label>
                        </div>

                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Answer Question</button>
                    </div>
                </Fragment>
                :
                <div>
                    <div className="card-body">
                        <div>
                            {question.optionOne.text} {userVotedForOptionOne && <strong>Your Vote!</strong>}
                            <div className="bar">
                                <div className="bar-item"
                                     role="progressbar"
                                     style={{ width: `${precentVotesOptionOne}%` }}
                                     aria-valuenow={precentVotesOptionOne}
                                     aria-valuemin="0"
                                     aria-valuemax="100">{precentVotesOptionOne}%
                                </div>
                            </div>
                            <span
                              className="text-gray text-italic text-small">{countVotesOptionOne} out of {countVotesTotal} Votes</span>
                        </div>
                        <div>
                            {question.optionTwo.text} {userVotedForOptionTwo && <strong>Your Vote!</strong>}
                            <div className="bar">
                                <div className="bar-item"
                                     role="progressbar"
                                     style={{ width: `${precentVotesOptionTwo}%` }}
                                     aria-valuenow={precentVotesOptionTwo}
                                     aria-valuemin="0"
                                     aria-valuemax="100">{precentVotesOptionTwo}%
                                </div>
                            </div>
                            <span
                              className="text-gray text-italic text-small">{countVotesOptionTwo} out of {countVotesTotal} Votes</span>

                        </div>

                    </div>
                    <div className="card-footer">
                        <button className="btn" onClick={this.handleGoBack}>Back</button>
                    </div>
                </div>

              }


          </div>

        );
    }

}

function mapStateToProps({
      users
      ,
      questions
      ,
      authenticateUser
      ,
  }
  , props) {
    let question_id = props.match?.params.question_id ?? props.question_id;

    return {
        authenticateUser,
        question: Object.values(questions).find((question) => question.id === question_id),
        users: Object.values(users),
    };
}

export default connect(mapStateToProps)(QuestionCardPoll);





