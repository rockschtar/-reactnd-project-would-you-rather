import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import darth404 from './../Darth404.svg'
import { Button, Container, Image } from 'semantic-ui-react'

class NotFound extends Component {
  onGoBack = (e) => {
    this.props.history.goBack()
  }

  render () {
    return (

      <Container textAlign={'center'}>
        <h1>404 Error</h1>
        <Image src={darth404} />
        <h3>You underestimate the power of the dark
          site</h3>
        <Button secondary onClick={this.onGoBack}>Go Back</Button>
      </Container>
    )
  }
}

export default withRouter(NotFound)
