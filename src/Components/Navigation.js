import React, {Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Logout from './Logout';
import { Link } from 'react-router-dom';


class Navigation extends Component {

    render() {

        const { authenticateUser} = this.props;

        return (
          <header className="navbar">
              <section className="navbar-section">
                  <section className="navbar-section">
                      {authenticateUser && `Hi ${authenticateUser}`}
                  </section>
              </section>
              <section className="navbar-center">
                  <Link to={`/`}className='btn btn-link'>Home</Link>
                  <Link to='/add-question' className='btn btn-link'>Add Question</Link>
                  <Link to={`/leaderboard`}className='btn btn-link'>Leader Board</Link>
              </section>
              <section className="navbar-section">
                  {authenticateUser && <Logout />}
              </section>
          </header>

        )
    }

}

function mapStateToProps({ authenticateUser }) {
    return {
        authenticateUser : authenticateUser
    };
}

export default withRouter(connect(mapStateToProps)(Navigation));