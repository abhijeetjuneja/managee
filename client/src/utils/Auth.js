import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if(this.props.route.auth){
        if (!this.props.isAuthenticated) {
          this.props.addFlashMessage({
            type: 'error',
            text: 'You need to login to access this page'
          });
          this.context.router.push('/login');
        }
      }
      else{
        if (this.props.isAuthenticated) {
          this.context.router.push('/dashboard');
        }
      }

    }

    componentWillUpdate(nextProps) {
      if(this.props.route.auth){
        if (!nextProps.isAuthenticated) {
          this.context.router.push('/login');
        }
      }
      else{
        if (nextProps.isAuthenticated) {
          this.context.router.push('/dashboard');
        }
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
