import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, FormGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';
import validator from 'validator';
import { makePostRequest } from '../../ajax/requests';
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
      loadingregistration: false
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
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
    makePostRequest("/api/users/register", newUser).then((data)=>{
      console.log(data);
      this.setState({ loadingregistration: false});
     }).catch((error)=> {
       console.log(error);
       this.setState({ loadingregistration : false});
     });
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
  render(){
    return (
      <section className="Register-form">
        <h3>Enter your information</h3>
        <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup>
         <Col sm={4}>
          Username
         </Col>
         <Col sm={8}>
           <FormControl type="text" placeholder="Username" name="username" onChange={this.inputChanged}/>
        </Col>
        </FormGroup>
        <FormGroup>
         <Col sm={4}>
          Email
         </Col>
         <Col sm={8}>
           <FormControl type="email" placeholder="Email" name="email" onChange={this.inputChanged}/>
        </Col>
        </FormGroup>
        <FormGroup>
         <Col sm={4}>
         Password
         </Col>
         <Col sm={8}>
           <FormControl type="password" placeholder="Password" name="password" onChange={this.inputChanged} />
         </Col>
       </FormGroup>
       <FormGroup>
        <Col sm={4}>
        Confirm password
        </Col>
        <Col sm={8}>
          <FormControl type="password" placeholder="Re-enter your password" name="passwordconf" onChange={this.inputChanged} />
        </Col>
      </FormGroup>
      <FormGroup>
       <Col sm={4}>
       Twitter username
       </Col>
       <Col sm={8}>
         <FormControl type="text" placeholder="Your twitter username" name="twitterusername" onChange={this.inputChanged} />
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

export default connect(mapStateToProps)(RegisterForm);
