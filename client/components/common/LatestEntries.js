import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Pagination } from 'react-bootstrap';
import moment from 'moment';
import Entry from './Entry';
import './styles/styles.sass';

class LatestEntries extends Component {
  constructor() {
    super();
    this.state = {
      itemsToDisplay : [],
      itemsPerPage: 3,
      activePage: 1,
      numberOfPages: 0,
      fullList: null,
      userpage: null
    }
  }
  handleSelect(value) {
    const firstIndex = this.state.itemsPerPage * value - this.state.itemsPerPage;
    const lastIndex = this.state.itemsPerPage * value;
    const itemsToDisplay =  this.state.fullList.slice(firstIndex  , lastIndex);
    this.setState({ itemsToDisplay, activePage: value });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data){
    const fullList = nextProps.data;
    const numberOfPages = Math.ceil(fullList.length/ this.state.itemsPerPage);
    const lastIndex = this.state.itemsPerPage * this.state.activePage;
    const itemsToDisplay = nextProps.data.slice( 0, lastIndex);
    this.setState({ itemsToDisplay, numberOfPages, fullList, userpage: this.props.userpage });
    }
  }
  renderPagination() {
    if(this.state.itemsToDisplay.length > 0){
      return (
      <div style={{ textAlign: "center" }}>
        <Pagination
        ellipsis
        boundaryLinks
        items={this.state.numberOfPages}
        maxButtons={7}
        activePage={this.state.activePage}
        onSelect={this.handleSelect.bind(this)} />
      </div>
      );
    }
  }
  render(){
    let listItems;
    if(this.state.itemsToDisplay.length > 0 ){
     listItems = this.state.itemsToDisplay.map((value, index) => {
         return (
           <ListGroupItem key={index}>
              <Entry title={value.title}
              username={value.authorusername}
              date={moment(value.creationdate).format('MMMM Do YYYY, h:mm:ss a')}
              content={value.entrybody}
              userid={value.author}
              userpage={this.state.userpage}
              entryid={value._id}
              />
           </ListGroupItem>
         );
    });
    } else {
       listItems = <ListGroupItem><h4 className="entries-not-found-title">0 entries found</h4></ListGroupItem>;
    }
    return (
      <section className="Entries-container">
        <h3>Latest Entries for {this.props.userOfEntries}</h3>
         <ListGroup>
           { listItems }
         </ListGroup>
         { this.renderPagination() }
      </section>
    );
  };
}

export default LatestEntries;
