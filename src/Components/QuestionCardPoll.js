import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isAnswered } from '../Utils/Helpers'
import { handleAnswerQuestion } from '../Actions/Questions'
import { Form, Progress, Radio, Segment } from 'semantic-ui-react'
import QuestionCard from './QuestionCard'
import { withRouter } from 'react-router-dom'
import NotFound from './NotFound'

class QuestionCardPoll extends Component {
  state = {
    answer: null,
    loading: false,
  }

  static propTypes = {
    questionId: PropTypes.string,
    question: PropTypes.object.isRequired
  }

  handleAnswerChange = (e, { value }) => {
    this.setState({ answer: value })
  }

  handleAnswerQuestion = () => {
    this.setState({ loading: true })

    const { question, authedUser, handleAnswerQuestion } = this.props
    const { answer } = this.state

    handleAnswerQuestion(authedUser, question.id, answer).then(() => {
      this.setState({ loading: false })
    })
  }

  handleGoBack = () => {
    this.props.history.goBack()
  }

  render () {
    const { loading, answer } = this.state
    const { question, authedUser } = this.props

    if (!question) {
      return <NotFound/>
    }

    const round = (number) => {
      return Math.round(number * 100) / 100
    }

    const countVotesOptionOne = question.optionOne.votes.length
    const countVotesOptionTwo = question.optionTwo.votes.length
    const countVotesTotal = countVotesOptionOne + countVotesOptionTwo
    const precentVotesOptionOne = round((countVotesOptionOne * 100) / countVotesTotal)
    const precentVotesOptionTwo = round((countVotesOptionTwo * 100) / countVotesTotal)
    const userVotedForOptionOne = question.optionOne.votes.includes(authedUser)
    const userVotedForOptionTwo = question.optionTwo.votes.includes(authedUser)
    const isButtonDisabled = loading || (!isAnswered(question, authedUser) && answer === null)

    const form = (
      <Form loading={loading}>
        <Segment vertical><strong>Would you rather</strong></Segment>
        <Segment vertical>
          <Form.Field>
            <Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.answer === 'optionOne'}
              onChange={this.handleAnswerChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.answer === 'optionTwo'}
              onChange={this.handleAnswerChange}
            />
          </Form.Field>
        </Segment>

      </Form>
    )

    const result = (

      <>
        <Segment vertical>
          {countVotesOptionOne} out of {countVotesTotal} Votes
          <Progress percent={precentVotesOptionOne} progress success>
            {question.optionOne.text} {userVotedForOptionOne &&
          <span className="ui blue label">Your Vote!</span>}
          </Progress>
        </Segment>


        <Segment vertical>
          {countVotesOptionTwo} out of {countVotesTotal} Votes
          <Progress percent={precentVotesOptionTwo} progress success>
            {question.optionTwo.text} {userVotedForOptionTwo &&
          <span className="ui blue label">Your Vote!</span>}
          </Progress>
        </Segment>


      </>

    )

    let content = form
    let onButtonClick = this.handleAnswerQuestion
    let buttonText = 'Answer Question'

    if (isAnswered(question, authedUser)) {
      content = result
      buttonText = 'Go Back'
      onButtonClick = this.handleGoBack
    }

    return (
      <QuestionCard
        question={question}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
        isButtonDisabled={isButtonDisabled}
      >{content}</QuestionCard>)
  }
}

export default withRouter(connect((
  { users, questions, authedUser }
  , props) => {
    const questionId = props.match?.params?.question_id ?? props.questionId

    return {
      authedUser,
      question: Object.values(questions).find((question) => question.id === questionId),
      users: Object.values(users),
    }
  }
  ,
  { handleAnswerQuestion },
)(QuestionCardPoll))
