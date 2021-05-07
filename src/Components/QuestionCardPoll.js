import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import QuestionCardHeader from './QuestionCardHeader';
import { connect } from 'react-redux';
import { isAnswered } from '../Utils/Helpers';
import { handleAnswerQuestion } from '../Actions/Questions';

class QuestionCardPoll extends Component {

    state = {
        answer : null,
        loading: false
    }

    static propTypes = {
        question_id: PropTypes.string,
        question: PropTypes.object.isRequired,
    };

    handleAnswerChange = (e) => {
        this.setState({ answer: e.target.value});
    }

    handleAnswerQuestion = () => {

        this.setState({loading : true})

        const { question, authedUser } = this.props;
        const { answer } = this.state;

        this.props.handleAnswerQuestion(authedUser, question.id, answer).then(() => {
            this.setState({loading: false});
        })

    }

    handleGoBack = () => {
        this.props.history.goBack();
    };

    render() {

        const { loading } = this.state;
        const { question, authedUser } = this.props;

        const round = (number) => {
            return Math.round(number * 100) / 100;
        }

        const countVotesOptionOne = question.optionOne.votes.length;
        const countVotesOptionTwo = question.optionTwo.votes.length;
        const countVotesTotal = countVotesOptionOne + countVotesOptionTwo;
        const precentVotesOptionOne = round((countVotesOptionOne * 100) / countVotesTotal);
        const precentVotesOptionTwo = round((countVotesOptionTwo * 100) / countVotesTotal);
        const userVotedForOptionOne = question.optionOne.votes.includes(authedUser);
        const userVotedForOptionTwo = question.optionTwo.votes.includes(authedUser);

        return (

          <div className="card text-center">
              <QuestionCardHeader question={question}/>

              {!isAnswered(question, authedUser)
                ?
                <Fragment>
                    <div className="card-body">
                        <div className="form-group d-inline-block text-left">
                            <label className="form-radio">
                                <input
                                  type="radio"
                                  name="answer"
                                  value="optionOne"
                                  disabled={loading}
                                  onChange={this.handleAnswerChange}

                                />
                                <i className="form-icon"/> {question.optionOne.text}
                            </label>
                            <label className="form-radio">
                                <input
                                  type="radio"
                                  name="answer"
                                  disabled={loading}
                                  value="optionTwo"
                                       onChange={this.handleAnswerChange}/>
                                <i className="form-icon"/> {question.optionTwo.text}
                            </label>
                        </div>

                    </div>
                    <div className="card-footer">
                        <button  disabled={loading} onClick={this.handleAnswerQuestion} className="btn btn-primary">Answer Question</button>
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


export default connect(({ users, questions, authedUser }, props) => {
    let question_id = props.match?.params.question_id ?? props.question_id;

    return {
        authedUser,
        question: Object.values(questions).find((question) => question.id === question_id),
        users: Object.values(users),
    };

    }, { handleAnswerQuestion })(QuestionCardPoll);






