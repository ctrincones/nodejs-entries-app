import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';
import EntryForm from './../../common/EntryForm';

class CreateEntryPage extends Component {
  render() {
      return (
        <Grid>
         <Row>
          <Col md={4} mdOffset={4}>
              <EntryForm />
          </Col>
        </Row>
       </Grid>
      );
  }
}

export default CreateEntryPage;
