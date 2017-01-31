import React, { Component } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signOutUser, clearAuthState } from './../actions';
import { loadUserData } from './../localStorage';

class Header extends Component {
  constructor() {
    super();
    this.signOutUser = this.signOutUser.bind(this);
  }
  signOutUser() {
    const UserData = loadUserData();
    if (UserData) {
      this.props.signOutUser(UserData.token);
    } else {
       this.props.clearAuthState();
    }
  }
 renderHeaderUserButtons() {
   if(!this.props.auth.user){
      return (
        <Nav pullRight>
          <LinkContainer to={{ pathname: '/signin' }}>
            <NavItem>Sign in</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/register' }}>
            <NavItem>Register</NavItem>
          </LinkContainer>
        </Nav>
      );
   }
   console.log(this.props.auth.user);
   return (
     <Nav pullRight>
     <NavItem>{this.props.auth.user.username}</NavItem>
     <LinkContainer to={{ pathname: '/signin' }}>
       <NavItem onClick={this.signOutUser}>Sign out</NavItem>
     </LinkContainer>
     </Nav>
   );
 }
 renderCreateEntryButton() {
      if(this.props.auth.user){
        return (
          <LinkContainer to={{ pathname: '/createentry' }}>
            <NavItem>Add a new entry</NavItem>
          </LinkContainer>
        );
      }
 }
 render() {
  return (
  <header>
    <Navbar inverse>
       <Nav>
          <LinkContainer to={{ pathname: '/main' }}>
            <NavItem>Main</NavItem>
          </LinkContainer>
          {this.renderCreateEntryButton()}
       </Nav>
           {this.renderHeaderUserButtons()}
      </Navbar>
    </header>
  );
 }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
}

export default connect(mapStateToProps, { signOutUser, clearAuthState })(Header);
