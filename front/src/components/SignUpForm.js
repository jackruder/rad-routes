import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class SignUpForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('User was created: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <Form>

        <Form.Group className="mb-3" controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="John" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Smith" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="jsmith@example.com" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
            <Form.Control style={{position: 'relative', top: '5px'}} type="password" placeholder="Confirm password" />
        </Form.Group>

        <Form.Check 
            type={'checkbox'}
            id={`is_guide`}
            label={`I am a guide.`}
        />
        <br />

        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
      );
    }
  }
  