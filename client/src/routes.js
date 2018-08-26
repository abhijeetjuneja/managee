import React from 'react';
import { Route ,Router} from 'react-router';

import App from './containers/App';
import Greetings from './containers/greetings/Greetings';
import SignupPage from './containers/signup/SignupPage';
import LoginPage from './containers/login/LoginPage';
import DashboardPage from './containers/dashboard/DashboardPage';
import ManagePage from './containers/manage/ManagePage';
import Auth from './utils/Auth';

export default (
  <Router>
    <Route exact path="/" component={Auth(Greetings)} auth={false}/>
    <Route path="/" component={App}>
      <Route path="signup" component={Auth(SignupPage)} auth={false} />
      <Route path="login" component={Auth(LoginPage)} auth={false}/>
      <Route path="dashboard" component={Auth(DashboardPage)} auth={true}/>
      <Route path="manage" component={Auth(ManagePage)} auth={true}/>
    </Route>

  </Router>

)
