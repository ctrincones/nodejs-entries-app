import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';
import LatestEntries from './../../common/LatestEntries';
import LatestTweets from './../../common/LatestTweets';
import { connect } from 'react-redux';
import { getUserEntries, getUserTweets, getAuthorInfo } from './../../../actions';
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
    this.loadUserData();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.entries.userentries){
      const userEntries = nextProps.entries.userentries;
      this.setState({ userentries: userEntries });
    }
    if(nextProps.entries.usertweets){
      this.setState({ usertweets: nextProps.entries.usertweets });
    }
    if(nextProps.entries.authorinfo){
      const username = nextProps.entries.authorinfo.username;
      this.setState({ authorUsername: username });
    }
    if(nextProps.location.query.id !== this.props.location.query.id){
      this.loadUserData(nextProps.location.query.id);
    }
  }
  loadUserData(newid) {
    let userId;
    if(newid){
      userId = newid;
    } else {
      userId = this.props.location.query.id;
    }
    let token = null;
    this.props.getUserEntries(userId);
    const userData = loadUserData();
    if(userData){
      token = userData.token;
    }
    this.props.getUserTweets(userId,token);
    this.props.getAuthorInfo(userId);
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

export default connect(mapStateToProps, {getUserEntries, getUserTweets, getAuthorInfo })(UserPage);
