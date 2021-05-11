import { Component } from 'react'
import { connect } from 'react-redux'
import { getUserScore } from '../Utils/Helpers'
import ScoreCard from './ScoreCard'

class LeaderBoard extends Component {
  render () {

    const { leaderBoard } = this.props

    return (
      <>
        {leaderBoard.map((userScore, index) => (
          <ScoreCard key={index} userScore={userScore}/>
        ))}
      </>)
  }
}

export default connect(({ users }) => {

  const leaderBoard = Object.values(users)
    .map(user => { return getUserScore(user)})
    .sort((a, b) => b.score - a.score)
  return {
    leaderBoard,
  }
})(LeaderBoard)