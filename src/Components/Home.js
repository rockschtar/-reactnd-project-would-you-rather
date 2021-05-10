import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import QuestionList from './QuestionList'
import Login from './Login'

class Home extends Component {
  questionsByType = (type) => {
    const { questions, authedUser } = this.props

    switch (type) {
      case 'answered':
        return questions.filter(question => question.optionOne.votes.includes(authedUser) ||
          question.optionTwo.votes.includes(authedUser))
      case 'unanswered':
      default:
        return questions.filter(question => !question.optionOne.votes.includes(authedUser) &&
          !question.optionTwo.votes.includes(authedUser))
    }
  }

  tabPanes = () => {
    return [
      {
        menuItem: 'Unanswered Questions',
        render: () => <Tab.Pane className="wyr-tab-content" attached={true}><QuestionList
          questions={this.questionsByType('unanswered')}/></Tab.Pane>,
      },
      {
        menuItem: 'Answered Questions',
        render: () => <Tab.Pane className="wyr-tab-content" attached={false}><QuestionList
          questions={this.questionsByType('answered')}/></Tab.Pane>,
      },

    ]
  }

  render () {
    const { authedUser } = this.props

    if (!authedUser) {
      return <Login/>
    }

    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={this.tabPanes()}/>
    )
  }
}

export default connect(({ authedUser, questions }) => {
  return {
    authedUser: authedUser,
    questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  }
})(Home)
