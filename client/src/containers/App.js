import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

class App extends React.Component {
  render() {
    return (
      <div style={{minHeight:'100vh'}}>
        <NavigationBar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
