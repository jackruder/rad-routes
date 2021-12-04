import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const defaultFormData = {
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    is_guide: false
}

const redOutline = "red solid 2px";

export default function SignUp(){
    const [formData, setFormData] = useState(defaultFormData);
    const [passwordOutline, setPasswordOutline] = useState(false);
    const [passwordConfirmed, setPasswordConfirmed] = useState(false);
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const errorSetters = {
        username: setUsernameError,
        email: setEmailError
    }

    return(
        <Card style = {{ margin: 'auto', top: '50px', width: '380px' }}>
            <div style = {{ display: 'flex' }}>
            <Card.Body>
                <Card.Title>Sign Up</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="first_name">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="johnsmith42"
                            onInput={e => {
                                let newData = formData;
                                newData.username = e.target.value;
                                setFormData(newData);
                            }}
                        />
                        {usernameError !== "" ? 
                        <Form.Text style={{color: "#f00"}}>
                            {usernameError}
                        </Form.Text>
                        : <></>}
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
                        {emailError !== "" ? <><br/>
                        <Form.Text style={{color: "#f00"}}>
                            {emailError}
                        </Form.Text></>
                        : <></>}
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
                                // need to make sure that if the user has already typed in the confirmation box before
                                // that this box starts checking for equality as well
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
                                    setPasswordConfirmed(true);
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

                            // guard against password not being filled out
                            if(!passwordConfirmed) return;

                            fetch(`${apiUrlBase}/users/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData)
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                for(let key of Object.keys(data)){
                                    if(Object.prototype.toString.call(data[key]) === "[object Array]"){
                                        errorSetters[key](data[key][0]);
                                    }
                                }
                                // need to undo errors if successful
                                // and alert the user to success somehow (sweetalert2 time?)
                            })
                            .catch(e => {
                                console.log(e);
                            });
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