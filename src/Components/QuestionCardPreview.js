import { Component } from 'react'
import QuestionCard from './QuestionCard'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class QuestionCardPreview extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  onButtonClick = (e) => {
    e.preventDefault()
    const { question } = this.props
    this.props.history.push(`/questions/${question.id}`)
  }

  render () {
    const { question, authedUser } = this.props

    const isAnswered = question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)

    const buttonText = isAnswered ? 'View Results' : 'Answer Question'

    return (
      <QuestionCard
        question={this.props.question}
        buttonText={buttonText}
        onButtonClick={this.onButtonClick}>
        <Segment vertical><strong>Would you rather</strong></Segment>
        <Segment vertical textAlign={'center'}>{question.optionOne.text}<br/>...or...</Segment>
      </QuestionCard>
    )
  }
}

export default withRouter(connect((
  { authedUser },
  ) => {
    return {
      authedUser,
    }
  },
)(QuestionCardPreview))
