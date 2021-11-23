import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login(){
    return(
        <Card
            style={{   margin: 'auto', top: '50px', width: '25%' }}
        >
        
            <div style={{display: 'flex'}}>
            <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="jsmith@example.com" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>

                    <Form.Check 
                        type={'checkbox'}
                        id={`remember`}
                        label={`Keep me signed in on this computer.`}
                    />
                    <br />

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Card.Body>
            </div>
        </Card>
    )
}