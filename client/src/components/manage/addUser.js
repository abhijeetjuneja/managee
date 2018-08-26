import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { SubHead } from '../common/SubHead';
import { Button } from '../common/Button';
import { AddUserContainer } from './styles';
import {  OperationsLink } from './styles';
import Loader  from '../common/Loader';
import SuccessMessage from '../common/SuccessMessage';
import FailureMessage from '../common/FailureMessage';
function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false,
      showSuccess : false,
      showFailure : false
    }

    this.onChange = this.onChange.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.timeoutMessage = this.timeoutMessage.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  timeoutMessage(s){
    var main = this;
    setTimeout(function(){ 
      if(s) {
        main.setState({showSuccess : false});        
      }
      else main.setState({showFailure : false}); 
    }, 3000);
  }

  onSignup(e) {
    e.preventDefault();
    console.log(this.isValid());
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true , showSuccess : false});
      this.props.userSignupRequest(this.state).then(
        () => {
          this.setState({ isLoading: false, showSuccess : true });
          this.context.router.push('/login');          
        },
        (err) => {
          this.setState({ errors: err.data, isLoading: false, showFailure : true });
          this.timeoutMessage(false);
        }
      );
    }
  }

  render() {
    const { errors, isLoading, showFailure, showSuccess } = this.state;
    return (
      <AddUserContainer>
        <div></div>
        <form>
          <SubHead>Add User</SubHead>
          <OperationsLink onClick = {this.props.creation}>Back to User Management</OperationsLink>
          {showFailure ? <FailureMessage message = 'Sign up'/> : null}
          {showSuccess ? <SuccessMessage message = 'Redirecting.... Signed up'/> : null}
          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.username}
            field="username"
          />

          <TextFieldGroup
            error={errors.email}
            label="Email"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.email}
            field="email"
          />

          <TextFieldGroup
            error={errors.password}
            label="Password"
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            type="password"
          />

          <TextFieldGroup
            error={errors.passwordConfirmation}
            label="Password Confirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            field="passwordConfirmation"
            type="password"
          />
          <br />
          {isLoading ? <Loader /> : <Button  onClick={(e) => {this.onSignup(e)}} backColor={'#01D236'} textColor={'white'} disabled={isLoading || this.state.invalid}>
          Sign up
        </Button>}        
        </form>
      </AddUserContainer>
    );
  }
}

AddUser.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

AddUser.contextTypes = {
  router: PropTypes.object.isRequired
}

export default AddUser;
