import React from 'react';
import LoginForm from '../../components/login/LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="row" style={{margin : '0px 0px'}}>
        <div className="col-md-6 col-md-offset-3 col-xs-12 ">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
