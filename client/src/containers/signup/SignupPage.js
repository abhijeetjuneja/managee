import React from 'react';
import SignupForm from '../../components/signup/SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import PropTypes from 'prop-types';

class SignupPage extends React.Component {
  render() {
    const { userSignupRequest, isUserExists } = this.props;
    return (
      <div className="row" style={{margin:'0px 0px 0px 0px'}}>
        <div className="col-md-6 col-md-offset-3 col-xs-12">
          <SignupForm
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
             />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}


export default connect(null, { userSignupRequest, isUserExists })(SignupPage);
