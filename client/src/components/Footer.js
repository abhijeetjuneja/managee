import React from 'react';
import { Paragraph } from './common/Paragraph';

class Footer extends React.Component {

  render() {
    console.log(this);
    return (
      <Paragraph style={{paddingTop : '10vh',paddingBottom : '3vh', marginBottom:'0',backgroundColor:'white'}}>Home &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About Us&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Why Managee?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Paragraph>
    );
  }
}

export default Footer;
