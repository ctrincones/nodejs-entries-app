import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';
import LatestEntries from './../../common/LatestEntries';
import { connect } from 'react-redux';
import { getUserEntries } from './../../../actions';

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      userentries: null,
      authorUsername: null
    };
  }
  componentDidMount() {
    const userId = this.props.location.query.id;
     this.props.getUserEntries(userId);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.entries.userentries !== null){
      const userEntries = nextProps.entries.userentries;
      const authorUsername = userEntries[0].authorusername;
      this.setState({ userentries: userEntries, authorUsername });
    }
  }
  render(){
    return (
      <Grid>
       <Row>
        <Col md={8} mdOffset={2}>
           <LatestEntries userOfEntries={this.state.authorUsername} data={this.state.userentries} userpage={true} />
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

export default connect(mapStateToProps, {getUserEntries})(UserPage);
