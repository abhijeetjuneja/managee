import React from 'react';
import { WelcomeContainer } from './styles';
import { Head } from '../common/Head';
import { SubHead }from '../common/SubHead';
import { Button } from '../common/Button';
class Welcome extends React.Component {
  render() {
    return (
      <WelcomeContainer>
        <center>
          <Head>Managee</Head>
          <SubHead>"Intuitive User Management System"</SubHead>
          <a href='/signup'><Button backColor={'#68069C'} textColor={'white'}>Get Started</Button></a>
        </center>
      </WelcomeContainer>
    );
  }
}

export default Welcome;