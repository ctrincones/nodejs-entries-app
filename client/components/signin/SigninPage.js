import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';

import SignInForm from './SignInForm';

class SigninPage extends Component {
  render() {
    return(
      <Grid>
       <Row>
        <Col md={4} mdOffset={4}>
            <SignInForm />
        </Col>
      </Row>
     </Grid>
    );
  }
}

export default SigninPage;
