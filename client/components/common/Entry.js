import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './styles/styles.sass';

class Entry extends Component {
  renderAuthor(){
    if(this.props.userpage){
      return (
        <p>Published on <time> {this.props.date}</time></p>
      );
    }
    return (
      <p>Published by <Link to={{ pathname: "userpage", query: { id: this.props.userid } }}>{this.props.username}</Link> on <time>{this.props.date}</time></p>
    );
  }
  renderEditEntry() {
    if(this.props.auth.user){
      if(this.props.auth.user._id === this.props.userid){
        return(
          <Link to={{ pathname: "editentry", query: { id: this.props.entryid } }}>Edit entry</Link>
        );
      }
    }
  }
  render() {
  return (
        <section>
          <header>
            <h4 className="Entry-title"><strong>{this.props.title}</strong></h4>
          </header>
          <article className="Entry-content">
            <p>{this.props.content}</p>
          </article>
          <footer>
           <div className="edit-entry-container">
               {this.renderEditEntry()}
           </div>
           <div className="Entry-info">
               { this.renderAuthor() }
           </div>
          </footer>
        </section>
  );
 }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Entry);
