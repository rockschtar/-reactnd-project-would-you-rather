import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../Actions/AuthedUser';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    images = [
        'https://www.fillmurray.com/g/600/400',
        'https://www.placecage.com/600/400',
        'https://placekitten.com/600/400'];

    onSelectUser = (e) => {
        const userId = e.target.value;
        const { setAuthedUser } = this.props;
        setAuthedUser(userId);

        if (this.props.location.state) {
            this.props.history.push(this.props.location.state.from.pathname);
        }
    };

    render() {
        const { users } = this.props;

        const loginImage = this.images[Math.floor(Math.random() * this.images.length)];

        return (

          <div className="container grid-sm">
              <div className="card">
                  <div className="card-header bg-gray text-center">
                      <div className="card-title h5">Welcome to Would you rather?</div>
                  </div>
                  <div className="card-image">
                      <img src={loginImage} alt="Login Teaser" className="img-responsive"/>
                  </div>
                  <div className="card-header">
                      <div className="card-title h5">Login</div>
                  </div>
                  <div className="card-body">
                      <div className="form-group">
                          <select className="form-select" onChange={this.onSelectUser}>
                              <option key={0} value="">Please select a user</option>
                              {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                              ))}
                          </select>
                      </div>
                  </div>
              </div>

          </div>

        );
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users),
    };
}

export default withRouter(connect(mapStateToProps, { setAuthedUser })(Login));