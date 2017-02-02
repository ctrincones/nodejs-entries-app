import React,  { Component }  from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class LatestTweets extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      hiddentweets: [],
      user: null
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.user) {
      this.setState({ hiddentweets: nextProps.auth.user.hiddentweets, user: nextProps.auth.user });
    }
    if(nextProps.data){
      this.setState({ tweets: nextProps.data});
    }

  }
  render() {
    let userTweets;
    let isauthor = false;
    let ishidden = false;

    if(this.state.tweets.length > 0){
          userTweets = this.state.tweets.map((value,index) => {
            if(this.state.user){
              isauthor = value.authorid === this.state.user._id;
              ishidden = value.authorid === this.state.user._id && this.state.hiddentweets.indexOf(value.id.toString()) > -1;
            }  
          return(
            <ListGroupItem key={index}>
                <Tweet
                   username={ value.user }
                   image= { value.image }
                   tweetid = { value.id }
                   content = { value.text }
                   date = { value.creationdate }
                   isauthor = {isauthor}
                   ishidden= {ishidden}
                />
            </ListGroupItem>
          );
        });
    } else {
      userTweets = <ListGroupItem><h4 className="entries-not-found-title">This user hasnt posted tweets</h4></ListGroupItem>
    }
    return (
      <section className="Entries-container">
        <h3>Tweets</h3>
         <ListGroup>
           { userTweets }
         </ListGroup>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(LatestTweets);
