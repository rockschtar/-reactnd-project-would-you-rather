import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { setAuthedUser } from '../Actions/AuthedUser'
import MenuLink from './MenuLink'

class Navigation extends Component {
  state = {
    activeItem: 'home',
  }

  handleLogout = (e) => {
    e.preventDefault()
    const { setAuthedUser } = this.props
    setAuthedUser(null)
    this.props.history.push('/')
  }

  render () {
    const { user } = this.props
    const { activeItem } = this.state

    if (!user) {
      return <></>
    }

    return (
      <Menu pointing secondary>

        <MenuLink to="/">Home</MenuLink>
        <MenuLink to="/add">Add Question</MenuLink>
        <MenuLink to="/leaderboard">Leaderboard</MenuLink>

        <Menu.Menu position="right">
          <Menu.Item>
            Hello, {user.name}
          </Menu.Item>
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={this.handleLogout}
          >Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(connect(({ authedUser, users }) => {
  return {
    user: Object.values(users).find((user) => user.id === authedUser),
  }
}, { setAuthedUser })(Navigation))
