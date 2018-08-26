import React from 'react';
import { DashboardContainer, DashboardMessage } from './styles';

class Dashboard extends React.Component {
    
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
          user: this.props.user,
          errors: {},
          isLoading: true,
          detailRequest: ''
        };
    
    }

    componentWillReceiveProps(nextProps){
        this.setState({user : nextProps.user});
    }


    render() {
        const { user } = this.state;
        return (
            <DashboardContainer>
                <DashboardMessage>
                   Hello {user.username}!
                </DashboardMessage>
            </DashboardContainer>
        );
    }
}

export default Dashboard;
