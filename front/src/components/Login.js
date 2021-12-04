import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

export default function Login({ setLoggedIn }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [formDisabled, setFormDisabled] = useState(true);
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false);

    const navigate = useNavigate();

    return(
        <>
        { typeof(Storage) !== 'undefined' ?
            <Card
                style={{   margin: 'auto', top: '50px', width: '25%' }}
            >
                <Card.Body>
                    <Card.Title>Login</Card.Title>

                    {invalidLogin ?
                    <Form.Text style={{color: "#f00"}}>
                        Username or password is incorrect.
                    </Form.Text>
                    : <></>}
                    
                    <Form>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="johnsmith42" 
                                onInput={e => {
                                    setFormDisabled(password === "" || e.target.value === "");
                                    setUsername(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            
                            <Form.Control type="password" placeholder="Enter password"  
                                onInput={e => {
                                    setFormDisabled(username === "" || e.target.value === "");
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Check 
                            type={'checkbox'}
                            id={`remember`}
                            label={`Keep me signed in on this device.`}
                            onClick={e => {
                                setStayLoggedIn(e.target.checked);
                            }}
                        />
                        <br />

                        <Button variant="primary" type="submit"
                            disabled={formDisabled}
                            onClick={e => {
                                e.preventDefault();
                                console.log("sending: ", {
                                    username,
                                    password
                                });

                                fetch(`${apiUrlBase}/authorization/`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ username, password })
                                })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                    // check for invalid credentials
                                    if(Object.keys(data).length === 1 && Object.keys(data).indexOf('non_field_errors') >= 0){
                                        setInvalidLogin(true);
                                    }
                                    else{
                                        setInvalidLogin(false);
                                        try{
                                            if(stayLoggedIn){
                                                localStorage.setItem("auth_token", data.token);
                                            }
                                            else{
                                                sessionStorage.setItem("auth_token", data.token);
                                                localStorage.removeItem("auth_token");
                                            }
                                            localStorage.setItem("username", username);
                                            
                                            setLoggedIn(true);

                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Welcome',
                                                text: 'Good to see you again'
                                            }).then(navigate("/climbs"));
                                        }
                                        catch(e){
                                            console.log(e);
                                            alert("Unknown error");
                                        }
                                    }
                                })
                                .catch(err => console.log(err));
                            }}
                        >
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            :
            <div style={{textAlign: 'center'}}>
                Your browser does not support web storage. This means your credentials cannot be stored. <br/>
                You are still free to browse public guidebooks on RadRoutes!
            </div>
        }
        </>
    )
}