import React, { Component } from 'react';
import Header from './Header';
import { loadUserData } from './../localStorage';
import { connect } from 'react-redux';
import { getUserData } from './../actions';

class App extends Component {
  componentDidMount() {
     const userData = loadUserData();
     if(userData){
       this.props.getUserData(userData.token);
     }
  }
  render(){
    return (
      <div>
        <Header />
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default connect(null, { getUserData })(App);
