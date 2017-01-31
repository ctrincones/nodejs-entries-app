import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';
import LatestEntries from '../common/LatestEntries';
import { connect } from 'react-redux';
import { getAllEntries } from './../../actions';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      entrieslist: null
    };
  }
  componentDidMount() {
     this.props.getAllEntries();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.entries.entrieslist !== null){
      this.setState({ entrieslist: nextProps.entries.entrieslist });
    }
  }
  render(){
    return (
      <Grid>
       <Row>
        <Col md={8} mdOffset={2}>
           <LatestEntries userOfEntries={"All users"} data={this.state.entrieslist} />
        </Col>
      </Row>
     </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries
  };
}

export default connect(mapStateToProps, {getAllEntries})(MainPage);
