import { Link } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionCardHeader from './QuestionCardHeader';
import { connect } from 'react-redux';

class QuestionCardPreview extends Component {

    static propTypes = {
        question: PropTypes.object.isRequired,
    };

    render() {
        const { question, authenticateUser } = this.props;

        const isAnswered = question.optionOne.votes.includes(authenticateUser) ||
          question.optionTwo.votes.includes(authenticateUser);


        return (

          <div className="card text-center">
              <QuestionCardHeader question={question}/>

              <div className="card-body">
                  <div className="card-subtitle">{question.optionOne.text}</div>
                  <div className="card-subtitle text-gray">...or...</div>
              </div>

              <div className="card-footer">
                  <Link to={`/questions/${question.id}`} className="btn btn-primary">{isAnswered ? 'View Results' : 'Answer Question'}</Link>
              </div>
          </div>

        );
    }

}

function mapStateToProps({ authenticateUser }) {
    return {
        authenticateUser: authenticateUser,
    };
}

export default connect(mapStateToProps)(QuestionCardPreview);



