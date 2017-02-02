import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid , Row, Col, Image, Button } from 'react-bootstrap';
import { hideUserTweet, clearAuthState, showUserHiddenTweet } from './../../actions';
import { loadUserData } from './../../localStorage';
import { browserHistory } from 'react-router';

class Tweet extends Component {
  constructor() {
    super();
  }
  hideTweet(tweetid) {
     const userData = loadUserData();
     if(userData){
       this.props.hideUserTweet(tweetid,userData.token);
     } else {
       this.props.clearAuthState();
       browserHistory.push("/signin");
     }
  }
  showHiddenTweet(tweetid) {
    const userData = loadUserData();
    if(userData){
      this.props.showUserHiddenTweet(tweetid,userData.token);
    } else {
      this.props.clearAuthState();
      browserHistory.push("/signin");
    }
  }
  renderOptionsButton(tweetid) {
    if(this.props.isauthor){
      if(this.props.ishidden){
        return (
          <Button bsStyle="success" onClick={this.showHiddenTweet.bind(this,tweetid)}>Show</Button>
        );
      }
      return (
        <Button bsStyle="warning" onClick={this.hideTweet.bind(this,tweetid)}>Hide</Button>
      );
    }
    }
  render(){
    return(
      <section>
        <header>
          <Grid className="Tweet-header">
             <Row>
                <Col md={3} className="Twitter-profile-image-container">
                  <Image src={this.props.image } className="Twitter-profile-image" />
                </Col>
                <Col md={9}>
                  <h4 className="Tweet-title"><strong>@{ this.props.username }</strong></h4>
                </Col>
             </Row>
          </Grid>
        </header>
        <article className="Tweet-content">
          <p>{ this.props.content}</p>
        </article>
        <footer className="Tweet-info">
         <p>Posted on <time>{ this.props.date }</time></p>
         <div className="options-buttons">
             { this.renderOptionsButton(this.props.tweetid) }
         </div>
        </footer>
      </section>
    );
  }
}

export default connect(null, { hideUserTweet, clearAuthState, showUserHiddenTweet })(Tweet);
