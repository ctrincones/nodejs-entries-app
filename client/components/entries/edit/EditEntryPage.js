import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import EntryForm from './../../common/EntryForm';
import { getAllEntries } from './../../../actions';
import { connect } from 'react-redux';

class EditEntryPage extends Component {
  constructor() {
    super();
    this.state = {
      entryid: null,
      entrieslist: null
    };
  }
  componentDidMount() {
    const userId = this.props.location.query.id;
    this.setState({ entryid: userId });
    this.props.getAllEntries();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.entries.entrieslist){
      this.setState({ entrieslist: nextProps.entries.entrieslist  });
    }
  }
  render(){
    return(
      <Grid>
       <Row>
        <Col md={4} mdOffset={4}>
          <EntryForm editpage={true} entryid={this.state.entryid} entrieslist={this.state.entrieslist} />
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

export default connect(mapStateToProps,{ getAllEntries })(EditEntryPage);
