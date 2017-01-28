import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { Grid , Row, Col } from 'react-bootstrap';

class RegisterPage extends Component {
  render() {
    return(
      <Grid>
       <Row>
        <Col md={6} mdOffset={3}>
           <RegisterForm />
        </Col>
      </Row>
     </Grid>
    );
  }
}

export default RegisterPage;
