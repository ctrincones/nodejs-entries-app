import React, { Component } from 'react';
import { Form, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import './styles/styles.sass';

class SignInForm extends Component {
  render(){
    return (
  <section className="Signin-form">
    <h3>Sign in with your credentials</h3>
    <Form horizontal>
    <FormGroup controlId="formHorizontalEmail">
     <Col sm={3}>
      Email
     </Col>
     <Col sm={9}>
       <FormControl type="email" placeholder="Email" />
      </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalPassword">
     <Col sm={3}>
     Password
     </Col>
     <Col sm={9}>
       <FormControl type="password" placeholder="Password" />
     </Col>
   </FormGroup>
   <FormGroup>
    <Col smOffset={5} sm={2}>
     <Button type="submit" className="btn btn-info">
      Sign in
      </Button>
    </Col>
   </FormGroup>
  </Form>
</section>
    );
  }
}

export default SignInForm;
