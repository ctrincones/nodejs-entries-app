import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { loginUser, clearNotifications } from './../../actions';
import './styles/styles.sass';

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      disallowsubmit: true,
      loadinglogin: false,
      loginerror: false
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.loginsuccess){
      this.setState({ loadinglogin: false});
      this.props.clearNotifications();
      browserHistory.push('/main');
    }

    if(nextProps.auth.loginerror) {
      this.setState({ loadinglogin: false, loginerror: true, password: '' });
      this.props.clearNotifications();
      }
  }
  validateInputs() {
    if(this.state.username.length > 1 && this.state.password.length > 1){
      this.setState({ disallowsubmit: false });
    } else {
      this.setState({ disallowsubmit: true });
    }
  }
  inputChanged(e) {
     this.setState({ [e.target.name]: e.target.value });
     this.validateInputs();
  }
  submitForm(e) {
    e.preventDefault();
    this.setState({ loadinglogin: true });
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginUser(data);
  }
  renderSignInButton() {
    if(!this.state.loadinglogin){
      return(
        <Button type="submit" disabled={this.state.disallowsubmit} className="btn btn-info">
         Sign in
         </Button>
      );
    }
    return (
      <i className="fa fa-circle-o-notch fa-spin registration-spinner"></i>
    );
  }
  renderLoginError() {
    if(this.state.loginerror) {
      return(
        <Alert bsStyle="warning">
           <div className="registration-error-message"><strong>Login error</strong> please check your credentials.</div>
       </Alert>
      );
    }
  }
  render(){
    return (
  <section className="Signin-form">
    <h3>Sign in with your credentials</h3>
    {this.renderLoginError()}
    <Form horizontal onSubmit={this.submitForm}>
    <FormGroup>
     <Col sm={3}>
      Username
     </Col>
     <Col sm={9}>
       <FormControl type="text" name="username" value={this.state.username} onChange={this.inputChanged} placeholder="Username" />
      </Col>
    </FormGroup>
    <FormGroup>
     <Col sm={3}>
     Password
     </Col>
     <Col sm={9}>
       <FormControl type="password" name="password" value={this.state.password} onChange={this.inputChanged} placeholder="Password" />
     </Col>
   </FormGroup>
   <FormGroup>
    <Col smOffset={5} sm={2}>
      {this.renderSignInButton()}
    </Col>
   </FormGroup>
  </Form>
</section>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
}

export default connect(mapStateToProps, { loginUser, clearNotifications })(SignInForm);
