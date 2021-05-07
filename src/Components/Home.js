import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import QuestionsTabs from './QuestionsTabs';

class Home extends Component {

    render() {
        const { authedUser} = this.props;

        if(!authedUser) {
            return <Login />
        }

        return (

            <QuestionsTabs />

        );
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser : authedUser
    };
}

export default connect(mapStateToProps)(Home);
