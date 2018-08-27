import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';
import { Navbar, Navlist, Navlink, Navhead } from './styles';
import { getUserInfoRequest } from '../actions/authActions';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      errors: {},
      isLoading: true
    };
  }

  componentDidMount(){
      this.props.getUserInfoRequest().then((res) => {
          this.setState({user : res.data.user, isLoading : true});
      }); 
  }

  componentWillReceiveProps(){
    this.props.getUserInfoRequest().then((res) => {
      this.setState({user : res.data.user, isLoading : false});
    }); 
  }


  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { isAdmin } = this.state.user;
    const { isLoading } = this.state;
    const userLinks = (
        <Navbar>
          <Navlink href="/"><Navhead>Managee</Navhead></Navlink>
          <Navlist><Navlink href="/login" onClick={this.logout.bind(this)}>Logout</Navlink></Navlist>
        </Navbar>
    );

    const adminLinks = (
      <Navbar>
        <Navlink href="/"><Navhead>Managee</Navhead></Navlink>
        <Navlist><Navlink href="/" onClick={this.logout.bind(this)}>Logout</Navlink></Navlist>
        <Navlist><Navlink href="/dashboard">Dashboard</Navlink></Navlist>
        <Navlist><Navlink href="/manage">Manage</Navlink></Navlist>
        
      </Navbar>
    );

    const guestLinks = (
      <Navbar>
        <Navlink href="/"><Navhead>Managee</Navhead></Navlink>
        <Navlist><Navlink href="/signup">Sign up</Navlink></Navlist>
        <Navlist><Navlink href="/login">Login</Navlink></Navlist>
      </Navbar>
    );

    return (    
        isAuthenticated ? (isAdmin ? adminLinks : userLinks) : guestLinks  
                   
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getUserInfoRequest: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout,getUserInfoRequest })(NavigationBar);


