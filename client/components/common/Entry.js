import React, { Component } from 'react';
import { Link } from 'react-router';
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
  render() {
  return (
        <section>
          <header>
            <h4 className="Entry-title"><strong>{this.props.title}</strong></h4>
          </header>
          <article className="Entry-content">
            <p>{this.props.content}</p>
          </article>
          <footer className="Entry-info">
           { this.renderAuthor() }
          </footer>
        </section>
  );
 }
}

export default Entry;
