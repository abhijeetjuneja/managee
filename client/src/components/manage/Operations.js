import React from 'react';
import { Head } from '../common/Head';
import { SubHead }from '../common/SubHead';
import { Button } from '../common/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import AddUser from './addUser';
import Loader  from '../common/Loader';
import SuccessMessage from '../common/SuccessMessage';
import FailureMessage from '../common/FailureMessage';
import { OperationsContainer, OperationsEntry, OperationsHead, OperationsRow, OperationsTable, OperationsLink } from './styles';

function validateInput(data) {
    let errors = {};
  
    if (Validator.isEmpty(data.username)) {
      errors.username = 'This field is required';
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    }
}

class Operations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            errors: {},
            editingUser: {},
            username : '',
            editing : false,
            errors: {},
            isPageLoading: true,
            invalid: false,
            creation: false
        };

        this.onChange = this.onChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.creationComplete = this.creationComplete.bind(this);
        this.timeoutMessage = this.timeoutMessage.bind(this);
    }

    onChange(e) {
        var user = this.state.editingUser;
        user.username = e.target.value;
        this.setState({ username : e.target.value, editingUser : user });
      }

    creationComplete(){
        this.setState({ creation : false });
    }
    
    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    componentWillMount(){
        this.props.getUserListRequest().then((res) => {
            this.setState({userList : res.data.userList,isPageLoading : false});
        });
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

    addUser(){
        this.setState({creation : true});
    }

    deleteUser(user){
        this.setState({isLoading : true, showSuccess : false, showFailure : false});     
        this.props.getUserDeleteRequest(user.email).then((res) => {
            this.props.getUserListRequest().then((res) => {
                this.setState({userList : res.data.userList,editing : false, editingUser : {},isLoading : false, showSuccess : true});
                this.timeoutMessage(true);
            });
        });
    }

    editUser(user){
        var user = {username : user.username, isAdmin : user.isAdmin, email : user.email};
        this.setState({editingUser : user, username : user.username, editing : true});
    }

    sendEditRequest(user){
        this.setState({isLoading : true, showSuccess : false, showFailure : false});        
        if(this.isValid()){
            this.props.getUserEditRequest(this.state.editingUser,user.email).then((res) => {
                this.props.getUserListRequest().then((res) => {
                    this.setState({userList : res.data.userList,editing : false, editingUser : {},isLoading : false, showSuccess : true});
                    this.timeoutMessage(true);
                });
            });
        }
        
    }

    closeEdit(){
        this.setState({editingUser : {}, editing : false});
    }

    render() {
    const { userList,editingUser, editing, errors, creation, isLoading, isPageLoading , showFailure , showSuccess } = this.state;
    if(creation){
        return (
            <OperationsContainer>
                <SubHead>Admin Panel</SubHead>
                <hr style={{color : '#767576'}}/>
                <AddUser
                creation = {this.creationComplete}
                isUserExists = {this.props.isUserExists}
                userSignupRequest = {this.props.userSignupRequest}
                />
            </OperationsContainer>
        );
    }
    else
    if(isPageLoading)
    return (
        <div style={{margin:'35vh 0'}}><Loader /></div>
    );
    else
    return (
        <OperationsContainer>
            <SubHead>Admin Panel</SubHead>
            <hr style={{color : '#767576'}}/><br></br>
            {showFailure ? <FailureMessage message = 'Operation'/> : null}
            {showSuccess ? <SuccessMessage message = 'Done'/> : null}
            <OperationsTable>
                <tbody>
                <OperationsRow>
                    <OperationsHead>No.</OperationsHead>
                    <OperationsHead>Users<OperationsLink onClick = {this.addUser}>&nbsp;&nbsp;(Click here to add a User)</OperationsLink></OperationsHead>
                    <OperationsHead>Operations</OperationsHead>
                </OperationsRow>
                {userList.map((item, index) => {
                    var isAdmin = item.isAdmin.toString();
                    if(item.email == editingUser.email){
                        
                        return (
                            <OperationsRow>
                                <OperationsEntry>{index + 1}</OperationsEntry>
                                <OperationsEntry>
                                <form>
                                    <TextFieldGroup
                                        error={errors.username}
                                        label="Username"
                                        onChange={this.onChange}
                                        value={this.state.username}
                                        field="Username"
                                    />

                                    {isLoading ? <div><br /><br /><Loader /></div> :
                                    <div className="form-group" >
                                        <br></br><Button backColor={'#01D236'} textColor={'white'} onClick = {(i) => {i.preventDefault();this.sendEditRequest(item)}} disabled={this.state.isLoading || this.state.invalid}>
                                        Save
                                        </Button>&nbsp;
                                        <Button backColor={'red'} textColor={'white'} onClick = {(i) => this.closeEdit()} disabled={this.state.isLoading || this.state.invalid}>
                                        Cancel
                                        </Button>
                                    </div>
                                    }
                                    
                                </form>
                                </OperationsEntry>
                                <OperationsEntry></OperationsEntry>
                            </OperationsRow>
                        );
                    }
                    else
                    return(
                        <OperationsRow>
                            <OperationsEntry>{index + 1}</OperationsEntry>
                            <OperationsEntry>
                                <ul>
                                    <li>{item.username}</li>
                                    <li>Email - {item.email}</li>
                                    <li>Admin - {isAdmin}</li>
                                </ul>
                            </OperationsEntry>  
                            <OperationsEntry>
                                {!item.isAdmin && !editing ? ( isLoading ? <Loader /> : <div><OperationsLink onClick = {(i) => this.editUser(item)}>Edit</OperationsLink>&nbsp;&nbsp;
                    <OperationsLink onClick = {(i) => this.deleteUser(item)}>Delete</OperationsLink></div>) : null}                            
                            </OperationsEntry>
                        </OperationsRow>
                    );
                })}        
                </tbody>                        
            </OperationsTable>
        </OperationsContainer>
        );
  }
}

Operations.propTypes = {
    getUserListRequest: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired,
    userSignupRequest: PropTypes.func.isRequired
}
  

export default Operations;