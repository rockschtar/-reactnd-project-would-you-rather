import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../Actions/AuthedUser'
import { withRouter } from 'react-router-dom'
import { Card, Image, Select } from 'semantic-ui-react'

class Login extends Component {
  images = [
    'https://www.fillmurray.com/g/600/400',
    'https://placekitten.com/600/400']

  onSelectUser = (e, { value }) => {
    const { setAuthedUser } = this.props
    setAuthedUser(value)

    if (this.props.location.state) {
      this.props.history.push(this.props.location.state.from.pathname)
    }
  }

  render () {
    const { users } = this.props

    const loginImage = this.images[Math.floor(Math.random() * this.images.length)]
    const userOptions = users.map((user) => { return {text: user.name, value: user.id }})

    return (
      <Card centered fluid>
        <Card.Content textAlign='center'>
            <Card.Header>Would you rather?</Card.Header>
        </Card.Content>
        <Image src={loginImage} />
        <Card.Content textAlign={'center'}>
          <Select options={userOptions} placeholder="Please select a user" onChange={this.onSelectUser} />
        </Card.Content>
      </Card>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users: Object.values(users),
  }
}

export default withRouter(connect(mapStateToProps, { setAuthedUser })(Login))
