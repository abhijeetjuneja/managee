import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { SubHead } from '../common/SubHead';
import { Button } from '../common/Button';
import { LoginContainer } from './styles';
import SuccessMessage from '../common/SuccessMessage';
import FailureMessage from '../common/FailureMessage';
import Loader  from '../common/Loader';


function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onLogin = this.onLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.timeoutMessage = this.timeoutMessage.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  timeoutMessage(s){
    var main = this;
    setTimeout(function(){ 
      if(s) {
        main.setState({showSuccess : false});        
      }
      else main.setState({showFailure : false}); 
    }, 4000);
  }

  onLogin(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true, showSuccess : false });
      this.props.login(this.state).then(
        (res) => {
          this.setState({ isLoading: false, showSuccess : true });
          this.context.router.push('/dashboard');
        },
        (err) => {
          this.setState({ errors: err.response.data.errors, isLoading: false, showFailure : true });
          this.timeoutMessage(false);
        }        
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const { errors, identifier, password, isLoading, showFailure, showSuccess } = this.state;

    return (
      <LoginContainer>
        {showFailure ? <FailureMessage message = 'Log in'/> : null}
        {showSuccess ? <SuccessMessage message = 'Redirecting... Logged in'/> : null}
        <form>
          <SubHead>Log in to Managee</SubHead>
          <hr style={{color : '#767576'}}/><br></br>
          <div style={{margin:'0px 30px'}}>
            { errors.form && <div className="alert alert-danger" style={{color : 'red'}}><br />{errors.form}</div> }

            <TextFieldGroup
              field="identifier"
              label="Username / Email"
              value={identifier}
              error={errors.identifier}
              onChange={this.onChange}
            />

            <TextFieldGroup
              field="password"
              label="Password"
              value={password}
              error={errors.password}
              onChange={this.onChange}
              type="password"
            />
          </div>
        <br></br>
        </form>
        {isLoading ? <Loader /> : <Button onClick={(e) => {this.onLogin(e)}} backColor={'#01D236'} textColor={'white'} disabled={isLoading}>Login</Button>}        
        <br></br>
        <p>New to Managee? <a href='/signup'>Signup here</a> </p>         
      </LoginContainer>

    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);
