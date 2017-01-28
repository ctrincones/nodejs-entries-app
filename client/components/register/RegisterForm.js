import React, { Component } from 'react';
import { Form, Col, FormGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';
import validator from 'validator';
import makeAjaxRequest from '../../ajax/requests';
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
      disallowsubmit: true
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  validateInputs() {
      const { username, email, password, passwordconf, twitterusername} = this.state;
      if(username.length > 1 && validator.isEmail(email) && password === passwordconf && password.length > 1 && twitterusername.length > 1){
        console.log("allow");
        this.setState({disallowsubmit: false});
      } else {
        console.log("Dont allow");
        this.setState({disallowsubmit: true});
      }
  }
  inputChanged(e) {
    this.setState({ [e.target.name] : e.target.value });
    this.validateInputs();
  }
  onSubmit(e) {
     e.preventDefault();
     const { username, email, password, twitterusername } = this.state;
     const newUser = {
          username,
          password,
          email,
          twitterusername
     };
    makeAjaxRequest("POST","/api/users", newUser).then((data)=>{
       console.log(data);
     }).catch((error)=> {
       console.log(error);
     });
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
         <Button type="submit" className="btn btn-info" disabled={this.state.disallowsubmit}>
          Sign in
          </Button>
        </Col>
       </FormGroup>
      </Form>
    </section>
    );
  }
}

export default RegisterForm;
