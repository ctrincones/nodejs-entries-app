import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default () => {
  console.log(LinkContainer);
  return (
  <header>
    <Navbar inverse>
       <Nav>
          <LinkContainer to={{ pathname: '/main' }}>
            <NavItem>Main</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/createentry' }}>
            <NavItem>Add a new entry</NavItem>
          </LinkContainer>
       </Nav>
       <Nav pullRight>
        <LinkContainer to={{ pathname: '/signin' }}>
          <NavItem>Sign in</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/register' }}>
          <NavItem>Register</NavItem>
        </LinkContainer>
         <NavItem>Sign out</NavItem>
       </Nav>
      </Navbar>
    </header>
  );
}
