import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import QuestionsTabs from './QuestionsTabs';

class Home extends Component {

    render() {
        const { authenticateUser} = this.props;

        if(!authenticateUser) {
            return <Login />
        }

        return (

            <QuestionsTabs />

        );
    }
}

function mapStateToProps({ authenticateUser }) {
    return {
        authenticateUser : authenticateUser
    };
}

export default connect(mapStateToProps)(Home);
