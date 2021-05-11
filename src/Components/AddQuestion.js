import { Component } from 'react'
import { Button, Card, Divider, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../Actions/Questions'

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    loading: false,
  }

  onChangeAnswer = (e) => {
    let newState = {}

    switch (e.target.name) {
      case 'option-1':
        newState = { optionOne: e.target.value }
        break
      case 'option-2':
        newState = { optionTwo: e.target.value }
        break
      default:
        return
    }

    this.setState(newState)
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.setState({ loading: true })

    const { optionOne, optionTwo } = this.state
    const { handleAddQuestion, authedUser, history } = this.props

    handleAddQuestion(optionOne, optionTwo, authedUser)
      .then(() => {
        this.setState({ loading: false, optionOne: '', optionTwo: '' }, () => {
          history.push('/')
        })
      })
  }

  render () {
    const { optionOne, optionTwo, loading } = this.state

    const isSubmitDisabled = loading || optionOne.trim() === '' || optionTwo.trim() === ''

    return (
      <Form loading={loading} onSubmit={this.onSubmit}>
        <Card fluid>
          <Card.Content>
            <Card.Header>Add Question</Card.Header>
          </Card.Content>

          <Card.Content>

            <Form.Field>
              <label>Would you rather</label>
            </Form.Field>
            <Form.Field>
              <input
                name="option-1"
                onChange={this.onChangeAnswer}
                value={optionOne}
                disabled={loading}
                placeholder="Enter Option One Here"/>
            </Form.Field>
            <Divider horizontal>OR</Divider>
            <Form.Field>
              <input
                name="option-2"
                onChange={this.onChangeAnswer}
                value={optionTwo}
                disabled={loading}
                placeholder="Enter Option Two Here"/>
            </Form.Field>
          </Card.Content>

          <Card.Content textAlign={'center'}>
            <Button
              primary
              disabled={isSubmitDisabled}
              type="submit">Submit</Button>
          </Card.Content>

        </Card>
      </Form>
    )
  }
}

export default withRouter(connect(
  ({ authedUser }) => {
    return {
      authedUser: authedUser,
    }
  },
  { handleAddQuestion })(AddQuestion))
