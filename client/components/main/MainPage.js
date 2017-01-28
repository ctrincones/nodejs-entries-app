import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';
import LatestEntries from '../common/LatestEntries';

class MainPage extends Component {
  render(){
    return (
      <Grid>
       <Row>
        <Col md={8} mdOffset={2}>
           <LatestEntries userOfEntries={"All users"} />
        </Col>
      </Row>
     </Grid>
    );
  }
}

export default MainPage;
