import { Component } from 'react'
import PropTypes from 'prop-types'
import QuestionCardPreview from './QuestionCardPreview'
import { Card } from 'semantic-ui-react'

export default class QuestionList extends Component {
  static propTypes = {
    questions: PropTypes.array.isRequired,
  }

  render () {
    const { questions } = this.props

    return (

      <Card.Group>
        {questions.map((question) =>
          <QuestionCardPreview key={question.id} question={question}/>,
        )}
      </Card.Group>
    )
  }
}
