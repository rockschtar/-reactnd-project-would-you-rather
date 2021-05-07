import React, {Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Logout from './Logout';
import { Link } from 'react-router-dom';

class Navigation extends Component {

    render() {

        const { user } = this.props;

        if(!user) {
            return <Fragment />
        }

        return (
          <header className="navbar">
              <section className="navbar-section">
                  <section className="navbar-section">
                      {`Hi, ${user.name}`}
                  </section>
              </section>
              <section className="navbar-center">
                  <Link to={`/`}className='btn btn-link'>Home</Link>
                  <Link to='/add' className='btn btn-link'>Add Question</Link>
                  <Link to={`/leaderboard`}className='btn btn-link'>Leader Board</Link>
              </section>
              <section className="navbar-section">
                  {<Logout />}
              </section>
          </header>

        )
    }

}

function mapStateToProps({ authedUser, users }) {
    return {
        user : Object.values(users).find((user) => user.id === authedUser)
    };
}

export default withRouter(connect(mapStateToProps)(Navigation));