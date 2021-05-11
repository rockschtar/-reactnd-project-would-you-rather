import React, { Component } from 'react'
import { Button, Card, Grid, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ago from 's-ago'

class QuestionCard extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    buttonText: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    isButtonDisabled: PropTypes.bool,
  }

  render () {
    const { question, users, buttonText, onButtonClick, isButtonDisabled, children } = this.props
    const user = users.find((user) => user.id === question.author)

    return (
      <Card fluid>
        <Card.Content textAlign={'center'}>
          <Card.Header>{ago(new Date(question.timestamp))} {user.name} asks</Card.Header>
        </Card.Content>
        <Card.Content>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={4} textAlign={'center'} verticalAlign={'middle'}>
                <Image src={user.avatarURL} circular/>
              </Grid.Column>
              <Grid.Column width={12} verticalAlign={'middle'}>
                {children}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content textAlign={'center'}>
          <Button primary
                  disabled={isButtonDisabled}
                  onClick={onButtonClick}>{buttonText}</Button>
        </Card.Content>
      </Card>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users: Object.values(users),
  }
}

export default withRouter(connect(mapStateToProps)(QuestionCard))
