import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, FormGroup, FormControl, Button, HelpBlock, Alert } from 'react-bootstrap';
import validator from 'validator';
import { registrationRequest, clearNotifications } from './../../actions';
import { browserHistory } from 'react-router';
import './styles/styles.sass';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordconf: '',
      twitterusername: '',
      disallowsubmit: true,
      loadingregistration: false,
      registrationerror: false
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.registrationsuccess){
      this.setState({ loadingregistration: false });
      this.props.clearNotifications();
      browserHistory.push('/main');
    }
    if(nextProps.auth.registrationerror){
      this.setState({ registrationerror: true });
      this.setState({ loadingregistration: false});
      this.props.clearNotifications();
    }
  }
  validateInputs() {
      const { username, email, password, passwordconf, twitterusername} = this.state;
      if(username.length > 1 && validator.isEmail(email) && password === passwordconf && password.length > 1 && twitterusername.length > 1){
        this.setState({disallowsubmit: false});
      } else {
        this.setState({disallowsubmit: true});
      }
  }
  inputChanged(e) {
    this.setState({ [e.target.name] : e.target.value });
    this.validateInputs();
  }
  onSubmit(e) {
     e.preventDefault();
     this.setState({ loadingregistration: true });
     const { username, email, password, twitterusername } = this.state;
     const newUser = {
          username,
          password,
          email,
          twitterusername
     };
     this.props.registrationRequest(newUser);
   }
   renderRegistrationButton () {
     if(!this.state.loadingregistration){
       return (
         <Button type="submit" className="btn btn-info" disabled={this.state.disallowsubmit}>
          Sign in
          </Button>
       );
     }
     return (
       <i className="fa fa-circle-o-notch fa-spin registration-spinner"></i>

     );
   }
   renderRegistrationError() {
     if(this.state.registrationerror){
       return (
         <Alert bsStyle="warning">
            <div className="registration-error-message"><strong>Registration error</strong> please check your information.</div>
        </Alert>
       );
     }
   }
  render(){
    return (
      <section className="Register-form">
        <h3>Enter your information</h3>
          {this.renderRegistrationError()}
        <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup>
         <Col sm={4}>
          Username
         </Col>
         <Col sm={8}>
           <FormControl type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.inputChanged}/>
        </Col>
        </FormGroup>
        <FormGroup>
         <Col sm={4}>
          Email
         </Col>
         <Col sm={8}>
           <FormControl type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.inputChanged}/>
        </Col>
        </FormGroup>
        <FormGroup>
         <Col sm={4}>
         Password
         </Col>
         <Col sm={8}>
           <FormControl type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.inputChanged} />
         </Col>
       </FormGroup>
       <FormGroup>
        <Col sm={4}>
        Confirm password
        </Col>
        <Col sm={8}>
          <FormControl type="password" placeholder="Re-enter your password" name="passwordconf" value={this.state.passwordconf} onChange={this.inputChanged} />
        </Col>
      </FormGroup>
      <FormGroup>
       <Col sm={4}>
       Twitter username
       </Col>
       <Col sm={8}>
         <FormControl type="text" placeholder="Your twitter username" name="twitterusername" value={this.state.twitterusername} onChange={this.inputChanged} />
       </Col>
     </FormGroup>
       <FormGroup>
        <Col smOffset={5} sm={2}>
           {this.renderRegistrationButton()}
        </Col>
       </FormGroup>
      </Form>
    </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { registrationRequest, clearNotifications })(RegisterForm);
