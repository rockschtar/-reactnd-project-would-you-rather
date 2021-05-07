import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
      return (
        rest.authedUser
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }}/>
      );
  }}/>
);

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    };
}

export default connect(mapStateToProps)(ProtectedRoute);