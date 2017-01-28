import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';
import NewEntryForm from './NewEntryForm';

class CreateEntryPage extends Component {
  render() {
      return (
        <Grid>
         <Row>
          <Col md={4} mdOffset={4}>
              <NewEntryForm />
          </Col>
        </Row>
       </Grid>
      );
  }
}

export default CreateEntryPage;
