import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';
import LatestEntries from './../../common/LatestEntries';
import LatestTweets from './../../common/LatestTweets';
import { connect } from 'react-redux';
import { getUserEntries, getUserTweets } from './../../../actions';
import { loadUserData } from './../../../localStorage';

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      userentries: null,
      authorUsername: null,
      usertweets: null
    };
  }
  componentDidMount() {
     const userId = this.props.location.query.id;
     let token = null;
     this.props.getUserEntries(userId);
     const userData = loadUserData();
     if(userData){
       token = userData.token;
     }
     this.props.getUserTweets(userId,token);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.entries.userentries){
      const userEntries = nextProps.entries.userentries;
      const authorUsername = userEntries[0].authorusername;
      this.setState({ userentries: userEntries, authorUsername });
    }
    if(nextProps.entries.usertweets){
      this.setState({ usertweets: nextProps.entries.usertweets });
    }
  }
  render(){
    return (
      <Grid>
       <Row>
        <Col md={6} mdOffset={1}>
           <LatestEntries userOfEntries={this.state.authorUsername} data={this.state.userentries} userpage={true} />
        </Col>
        <Col md={4}>
          <LatestTweets data={this.state.usertweets} / >
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

export default connect(mapStateToProps, {getUserEntries, getUserTweets })(UserPage);
