import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Image, Segment, Table } from 'semantic-ui-react'

export default class ScoreCard extends Component {

  static propTypes = {
    userScore: PropTypes.object.isRequired,
  }

  render () {
    const { userScore } = this.props

    return (
      <Segment>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column width={4}  textAlign={'center'} verticalAlign={'middle'}>
              <Image src={userScore.avatarURL} circular/>
            </Grid.Column>
            <Grid.Column width={8}>
              <h3>{userScore.name}</h3>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Answered Questions</Table.Cell>
                    <Table.Cell>{userScore.countAnswers}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Created Questions</Table.Cell>
                    <Table.Cell>{userScore.countQuestions}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={4} textAlign={'center'}>
              <Card>
                <Card.Content className='lightgray'>
                  <Card.Header><h3>Score</h3></Card.Header>
                </Card.Content>
                <Card.Content textAlign={'center'}>
                  <h2>{userScore.score}</h2>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }

}