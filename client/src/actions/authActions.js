import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/users/login', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}


export function getUserInfoRequest() {
  return dispatch => {
    return axios.get('/api/users/current/info');
  }
}

export function getUserListRequest() {
  return dispatch => {
    return axios.get('/api/users/all');
  }
}

export function getUserEditRequest(userData,email) {
  return dispatch => {
    return axios.put('/api/users/'+email+'/update', userData);
  }
}

export function getUserDeleteRequest(email) {
  return dispatch => {
    return axios.post('/api/users/'+email+'/delete');
  }
}
