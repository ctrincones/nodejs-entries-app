import React, { Component } from 'react';
import { Form, Col, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';
import _ from 'lodash';
import { createEntry, clearAuthState, clearEntryCreationStatus, editEntry } from './../../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loadUserData } from './../../localStorage';
import './styles/styles.sass';

class EntryForm extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      body: '',
      disallowpost: true,
      sending: false,
      error: false,
      success: false,
      editpage: null,
      entryid: null
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
     if(nextProps.entries.entrycreatesuccess){
        this.props.clearEntryCreationStatus();
        this.setState({ sending: false, title: '', body: '', success: true, error: false});
     }
     if(nextProps.entries.entrycreateerror){
       this.props.clearEntryCreationStatus();
       this.setState({ sending: false, title: '', body: '', error: true, success: false});
     }
     if(nextProps.editpage){
       this.setState({ editpage: nextProps.editpage, entryid: nextProps.entryid });
      }
      if(nextProps.entrieslist){
        this.findEntryValues(nextProps.entrieslist, this.state.entryid);
      }
  }
  findEntryValues(list,id) {
    console.log(id);
    console.log(list);
    const entry = _.find(list, {'_id': id });
    this.setState({ title: entry.title, body: entry.entrybody });
  }
  validateInputs() {
     if(this.state.title.length > 1 && this.state.body.length > 1){
       this.setState({ disallowpost : false});
     } else {
       this.setState({ disallowpost: true });
     }
  }
  inputChanged(e) {
    this.setState({ [e.target.name]: e.target.value});
    this.validateInputs();
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ sending: true });
    const userData = loadUserData();
    if(userData){
      const { title, body } = this.state;
      const entryData = {
        title,
        entrybody: body
      };
    if(this.state.editpage){
      this.props.editEntry(entryData,userData.token, this.state.entryid);
    } else {
      this.props.createEntry(entryData,userData.token);
    }
  } else {
    this.props.clearAuthState();
    browserHistory.push('/signin');
   }
 }
  renderPostButton() {
    if(!this.state.sending){
      return (
        <Button type="submit" className="btn btn-info">
         Save
         </Button>
      );
    }
    return (
      <i className="fa fa-circle-o-notch fa-spin sending-spinner"></i>
    );
  }
  renderError() {
    if(this.state.error){
      return (
        <Alert bsStyle="danger">
          <div className="status-message"><strong>Error:</strong> please check the contents of your entry an try again</div>
       </Alert>
      );
    }
  }
  renderSuccess () {
    const message = this.state.editpage ? 'edited an' : 'created a new';
    if(this.state.success){
    return (
      <Alert bsStyle="success">
        <div className="status-message"><strong>Congratulations</strong> You have succesfuly { message } entry</div>
     </Alert>
    );
     }
    }
  render(){
    const message = this.state.editpage ? 'Edit' : 'Add';
    return(
      <section className="Newentry-form">
        <h3>{message} an entry</h3>
        {this.renderError()}
        {this.renderSuccess()}
        <Form onSubmit={this.onSubmit} horizontal>
        <FormGroup>
         <Col sm={2}>
          <strong>Title:</strong>
         </Col>
         <Col sm={10}>
           <FormControl type="text" name="title" placeholder="Entry title" value={this.state.title} onChange={this.inputChanged} />
          </Col>
        </FormGroup>
        <FormGroup>
         <Col sm={12}>
             <label>Content:</label>
             <textarea className="form-control" name="body" value={this.state.body} onChange={this.inputChanged} rows="5" id="entry-content" placeholder="Add some text to your entry"></textarea>
          </Col>
        </FormGroup>
        <FormGroup>
        <Col smOffset={4} sm={2}>
           {this.renderPostButton()}
        </Col>
       </FormGroup>
      </Form>
    </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries
  };
}

export default connect(mapStateToProps,{ createEntry, clearAuthState, clearEntryCreationStatus, editEntry })(EntryForm);
