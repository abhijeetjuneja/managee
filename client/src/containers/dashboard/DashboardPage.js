import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import { getUserInfoRequest } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DashboardPage extends React.Component {
    
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
            this.setState({user : res.data.user});
        }); 
    }

    render() {
        const { user } = this.state;
        console.log(this.state);
        return (
            <Dashboard 
            user = {this.state.user}
            />
        );
    }
}

DashboardPage.propTypes = {
    getUserInfoRequest: PropTypes.func.isRequired
}

DashboardPage.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { getUserInfoRequest})(DashboardPage);
