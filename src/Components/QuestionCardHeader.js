import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
const  ago = require('s-ago');

const QuestionCardHeader = (props) => {

    const { question, users } = props;
    const user = users.find((user) => user.id === question.author);

    return (
      <Fragment>

          <div className="card-header p-0">
              <div className="card-title h5 bg-gray pt-1 pb-2">
                  {ago(new Date(question.timestamp))} <img src={user.avatarURL} alt={user.name} className="avatar s-circle"  /> {user.name} asks</div>
              <div className="card-subtitle h6">Would you rather</div>
          </div>
      </Fragment>


    );
};

QuestionCardHeader.propTypes = {
    question: PropTypes.object.isRequired,
};

function mapStateToProps({ users }) {
    return {
        users: Object.values(users),
    };
}

export default connect(mapStateToProps)(QuestionCardHeader);