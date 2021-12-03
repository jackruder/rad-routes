import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignUpForm from './SignUpForm.js';

export default function SignUp(){
    return(
        <Card style = {{ margin: 'auto', top: '50px', width: '25%' }}>
            <div style = {{ display: 'flex' }}>
            <Card.Body>
                <Card.Title>Sign Up</Card.Title>
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
            </Card.Body>
            </div>
        </Card>
    )
}