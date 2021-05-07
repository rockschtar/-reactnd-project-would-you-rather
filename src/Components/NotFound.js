import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NotFound extends Component {

    onGoBack = (e) => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="container grid-xs text-center p-2">
                <div className="darth404" />
                <p className="h1 text-uppercase">404 Error</p>
                <p className="h3 text-gray">You underestimate the power of the dark site</p>
                <p><button className="btn btn-lg btn-success" onClick={this.onGoBack}>Go Back</button></p>
            </div>
      );
    }
}

export default withRouter(NotFound);

