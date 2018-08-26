import React from 'react';
import { getUserInfoRequest, getUserListRequest,getUserEditRequest,getUserDeleteRequest } from '../../actions/authActions';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import  Operations from '../../components/manage/Operations';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ManagePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          user: {},
          errors: {},
          isLoading: true
        };
    }
    
    componentWillMount(){
        this.props.getUserInfoRequest().then((res) => {
            if(!res.data.user.isAdmin){
                this.context.router.push('/dashboard');
            }
            else
            this.setState({isLoading : false});
        });
    }

    render() {
        console.log(this.props);
        const { getUserInfoRequest, getUserListRequest, getUserEditRequest,userSignupRequest,isUserExists, getUserDeleteRequest } = this.props;
        if(!this.state.isLoading)
        return (
            <div className="container-fluid">
                <Operations
                    getUserListRequest = {getUserListRequest}
                    getUserEditRequest = {getUserEditRequest}
                    getUserDeleteRequest = {getUserDeleteRequest}
                    userSignupRequest = {userSignupRequest}
                    isUserExists = {isUserExists}
                />
            </div>
        );
        else
        return null;
    }
}

ManagePage.propTypes = {
    getUserInfoRequest: PropTypes.func.isRequired,
    getUserListRequest: PropTypes.func.isRequired,
    getUserEditRequest: PropTypes.func.isRequired,
    userSignupRequest: PropTypes.func.isRequired,
    getUserDeleteRequest: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired    
}

ManagePage.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { getUserInfoRequest, getUserListRequest, getUserEditRequest,userSignupRequest, isUserExists, getUserDeleteRequest })(ManagePage);
