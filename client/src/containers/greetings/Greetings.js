import React from 'react';
import Welcome from '../../components/greetings/Welcome';
import Footer from '../../components/Footer';
class Greetings extends React.Component {
  render() {
    return (
      <div style={{backgroundColor:'white'}}>
      <Welcome />
      <Footer />
      </div>
    );
  }
}

export default Greetings;
