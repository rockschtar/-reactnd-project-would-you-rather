import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import QuestionCardPreview from './QuestionCardPreview';

export default class QuestionList extends Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
    };

    render() {

        const { questions } = this.props;

        return (

          <Fragment>
              {questions.map((question) =>
                <div className="mb-2" key={question.id}>
                    <QuestionCardPreview question_id={question.id} question={question} />
                </div>
              )}
          </Fragment>
        )
    }

}