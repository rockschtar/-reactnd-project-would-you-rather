import { Component } from 'react'
import ScoreCard from './ScoreCard'
import { connect } from 'react-redux'
import { setAuthedUser } from '../Actions/AuthedUser'
import { getUserScore } from '../Utils/Helpers'

class Profile extends Component {

  render () {

    const { userScore } = this.props

    return (
      <ScoreCard userScore={userScore}/>
    )
  }
}

export default connect(({ authedUser, users }) => {
  const user = Object.values(users).find((user) => user.id === authedUser)
  return {
    user: user,
    userScore: getUserScore(user),
  }
}, { setAuthedUser })(Profile)
