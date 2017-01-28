import React, { Component } from 'react';
import { Form, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import './styles/styles.sass';

class NewEntryForm extends Component {
  render(){
    return(
      <section className="Newentry-form">
        <h3>Add an entry</h3>
        <Form horizontal>
        <FormGroup>
         <Col sm={2}>
          <strong>Title:</strong>
         </Col>
         <Col sm={10}>
           <FormControl type="text" placeholder="Entry title" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
         <Col sm={12}>
             <label>Content:</label>
             <textarea className="form-control" rows="5" id="entry-content" placeholder="Add some text to your entry"></textarea>
          </Col>
        </FormGroup>
        <FormGroup>
        <Col smOffset={4} sm={2}>
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

export default NewEntryForm;
