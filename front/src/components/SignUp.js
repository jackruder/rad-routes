import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const defaultFormData = {
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    is_guide: null
}

const redOutline = "red solid 2px";

export default function SignUp(){
    const [formData, setFormData] = useState(defaultFormData);
    const [passwordOutline, setPasswordOutline] = useState(false);
    const [password, setPassword] = useState("");

    return(
        <Card style = {{ margin: 'auto', top: '50px', width: '380px' }}>
            <div style = {{ display: 'flex' }}>
            <Card.Body>
                <Card.Title>Sign Up</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="first_name">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="bob420"
                            onInput={e => {
                                let newData = formData;
                                newData.username = e.target.value;
                                setFormData(newData);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="first_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="John"
                            onInput={e => {
                                let newData = formData;
                                newData.first_name = e.target.value;
                                setFormData(newData);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Smith"
                            onInput={e => {
                                let newData = formData;
                                newData.last_name = e.target.value;
                                setFormData(newData);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="jsmith@example.com" 
                            onInput={e => {
                                let newData = formData;
                                newData.email = e.target.value;
                                setFormData(newData);
                            }}
                        />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            style={{ outline: passwordOutline }}
                            onInput={e => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Form.Control
                            style={{position: 'relative', top: '5px', outline: passwordOutline}}
                            type="password"
                            placeholder="Confirm password"
                            onInput={e => {
                                let newData = formData;
                                if(password === e.target.value){
                                    setPasswordOutline(null);
                                    newData.password = password;
                                    setFormData(newData);
                                }
                                else{
                                    setPasswordOutline(redOutline);
                                }
                            }}
                        />
                    </Form.Group>

                    <Form.Check 
                        type={'checkbox'}
                        id={`is_guide`}
                        label={`I am a guide.`}
                        onInput={e => {
                            let newData = formData;
                            newData.is_guide = e.target.checked;
                            setFormData(newData);
                        }}
                    />
                    <br />

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={e => {
                            e.preventDefault();
                            console.log(formData);
                            fetch('http://localhost:8000/api/users/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData)
                            })
                            .then(res => res.json())
                            .then(data => console.log(data))
                            .catch(e => console.log(e));
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Card.Body>
            </div>
        </Card>
    )
}