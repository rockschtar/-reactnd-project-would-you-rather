import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthenticatedUser } from '../Actions/AuthenticatedUser';

class Logout extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        const { setAuthenticatedUser } = this.props;
        setAuthenticatedUser(null);
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


export default connect(mapStateToProps, { setAuthenticatedUser })(Logout);