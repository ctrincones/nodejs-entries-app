import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Entry from './Entry';
import './styles/styles.sass';

class LatestEntries extends Component {
  render(){
    return (
      <section className="Entries-container">
        <h3>Latest Entries for {this.props.userOfEntries}</h3>
         <ListGroup>
           <ListGroupItem>
              <Entry />
           </ListGroupItem>
           <ListGroupItem>Item 2</ListGroupItem>
           <ListGroupItem>...</ListGroupItem>
         </ListGroup>
      </section>
    );
  };
}

export default LatestEntries;
