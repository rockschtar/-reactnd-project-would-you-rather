import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';

class Home extends Component {

    render() {
        const { authenticateUser} = this.props;

        console.log("Render", 'Home')

        if(!authenticateUser) {
            return <Login />
        }

        return (
          <div className="form-group">
            Home {authenticateUser}
          </div>
        );
    }
}

function mapStateToProps({ authenticateUser }) {
    return {
        authenticateUser : authenticateUser
    };
}

export default connect(mapStateToProps)(Home);
