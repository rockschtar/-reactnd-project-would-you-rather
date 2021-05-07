import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../Actions/AuthedUser';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        const { setAuthedUser } = this.props;
        setAuthedUser(null);

        this.props.history.push('/');
    }

    render() {
        return (
            <button className="btn btn-link" onClick={this.handleLogout} style={{cursor:'pointer'}}>Logout</button>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    };
}


export default withRouter(connect(mapStateToProps, { setAuthedUser })(Logout));