import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../Actions/Questions';
import { withRouter } from 'react-router-dom';

class AddQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        loading: false,
    };

    isSubmitDisabled = () => {
        const { optionOne, optionTwo, loading } = this.state;
        return loading || optionOne.trim() === '' || optionTwo.trim() === '';
    };

    onChangeOption = (e) => {

        let newState = {};

        switch (e.target.name) {
            case 'option-1':
                newState = { optionOne: e.target.value };
                break;
            case 'option-2':
                newState = { optionTwo: e.target.value };
                break;
            default:
                return;
        }

        this.setState(newState);

    };

    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ loading: true });

        const { optionOne, optionTwo } = this.state;
        const { handleAddQuestion, authenticateUser, history } = this.props;

        handleAddQuestion(optionOne, optionTwo, authenticateUser)
          .then(() => {
              this.setState({ loading: false }, () => { history.push('/'); });
          });
    };

    render() {

        const { optionOne, optionTwo, loading } = this.state;

        return (
          <div className="card">
              <div className="card-header bg-gray p-0">
                  <div className="card-title h5 p-2">Add Question</div>
              </div>

              <form onSubmit={this.onSubmit}>
                  <div className="card-body">
                      <p className="text-gray">Complete the question:</p>
                      <p>
                          <strong>Would you rather...</strong>
                      </p>

                      <div className="form-group">
                          <p>
                              <input className="form-input"
                                     name="option-1"
                                     type="text"
                                     disabled={loading}
                                     value={optionOne}
                                     placeholder="Enter Option One Here"
                                     spellCheck="false"
                                     onChange={this.onChangeOption}
                                     data-ms-editor="true"/>
                          </p>
                          <p>
                              <input className="form-input"
                                     name="option-2"
                                     type="text"
                                     disabled={loading}
                                     value={optionTwo}
                                     placeholder="Enter Option Two Here"
                                     spellCheck="false"
                                     onChange={this.onChangeOption}
                                     data-ms-editor="true"/>
                          </p>
                      </div>
                  </div>
                  <div className="card-footer text-center">
                      <button
                        type="submit"
                        disabled={this.isSubmitDisabled()}
                        className="btn btn-primary">Submit
                      </button>
                  </div>
              </form>
          </div>
        );
    }
}

export default withRouter(connect(
  ({ authenticateUser }) => {
      return {
          authenticateUser: authenticateUser,
      };
  },
  { handleAddQuestion })(AddQuestion));

