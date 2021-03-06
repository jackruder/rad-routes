import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import { apiUrlBase } from '../util';

const defaultFormData = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_guide: false,
    info_private: false
}

export default function SignUp({ setLoggedIn }){
    const [formData, setFormData] = useState(defaultFormData);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");

    const navigate = useNavigate();

    const errorSetters = {
        username: setUsernameError,
        email: setEmailError,
        password: setPasswordError,
        first_name: setFirstNameError,
        last_name: setLastNameError
    }

    const formIsDisabled = () => {
        console.log("hello");
        return password === "" || formData.username === "" || formData.email === "" || passwordError !== "";
    }

    return(
        <Card style = {{ margin: 'auto', top: '50px', width: '380px' }}
            onClick={() => {
                
            }}
        >
            <div style = {{ display: 'flex' }}>
            <Card.Body>
                <Card.Title>Sign Up</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId="first_name">
                        <Form.Label>Username*</Form.Label>
                        {usernameError !== "" ?
                        <> <br/>
                        <Form.Text style={{color: "#f00"}}>
                            {usernameError}
                        </Form.Text> </>
                        : <></>}
                        <Form.Control type="text" placeholder="johnsmith42"
                            onInput={e => {
                                setUsername(e.target.value);

                                let newData = formData;
                                newData.username = e.target.value;
                                setFormData(newData);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="first_name">
                        <Form.Label>First Name</Form.Label>
                        {firstNameError !== "" ?
                        <> <br/>
                        <Form.Text style={{color: "#f00"}}>
                            {firstNameError}
                        </Form.Text> </>
                        : <></>}
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
                        {lastNameError !== "" ?
                        <> <br/>
                        <Form.Text style={{color: "#f00"}}>
                            {lastNameError}
                        </Form.Text> </>
                        : <></>}
                        <Form.Control type="text" placeholder="Smith"
                            onInput={e => {
                                let newData = formData;
                                newData.last_name = e.target.value;
                                setFormData(newData);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address*</Form.Label>
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
                        <Form.Label>Password*</Form.Label>
                        {passwordError !== "" ? <><br/>
                        <Form.Text style={{color: "#f00"}}>
                            {passwordError}
                        </Form.Text></>
                        : <></>}
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            style={{ marginBottom: '5px' }}
                            onInput={e => {
                                setPassword(e.target.value);
                                if(e.target.value === passConfirm){
                                    setPasswordError("");

                                    let newData = formData;
                                    newData.password = password;
                                    setFormData(newData);
                                }
                                else{
                                    setPasswordError("Passwords do not match");
                                }
                            }}
                        />
                        <Form.Control
                            style={{ marginBottom: '5px'}}
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            onInput={e => {
                                setPassConfirm(e.target.value);
                                if(e.target.value === password){
                                    setPasswordError("");

                                    let newData = formData;
                                    newData.password = password;
                                    setFormData(newData);
                                }
                                else{
                                    setPasswordError("Passwords do not match");
                                }
                            }}
                        />
                        <Button variant="light" size="sm"
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                        >
                            {showPassword ? "Hide Password" : "Show Password"}
                        </Button>
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

                    <Form.Check
                        type={'checkbox'}
                        id={`info_private`}
                        label={`Keep my info private`}
                        onInput={e => {
                            let newData = formData;
                            newData.info_private = e.target.checked;
                            setFormData(newData);
                        }}
                    />
                    <br />

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={formIsDisabled()}
                        onClick={e => {
                            e.preventDefault();

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
                                let err = false;
                                for(let key of Object.keys(formData)){
                                    if(Object.keys(data).indexOf(key) >= 0){
                                        if(Object.prototype.toString.call(data[key]) === "[object Array]"){
                                            err = true;
                                            errorSetters[key](data[key][0]);
                                        }
                                    }
                                    else if (Object.keys(errorSetters).indexOf(key) >= 0){
                                        errorSetters[key]("");
                                    }
                                }
                                if(!err){
                                    for(let key of Object.keys(errorSetters)){
                                        errorSetters[key](false);
                                    }

                                    //BEGIN LOGIN
                                    console.log("fetching authorization");
                                    fetch(`${apiUrlBase}/authorization/`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ username, password })
                                    })
                                    .then(res => res.json())
                                    .then(data => {

                                        try{
                                            sessionStorage.setItem("auth_token", data.token);
                                            localStorage.removeItem("auth_token");
                                            localStorage.setItem("username", username);

                                            setLoggedIn(true);

                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Account Created',
                                                text: `Welcome to Rad Routes, ${formData.first_name} ????`
                                            }).then(navigate("/books"));

                                        }
                                        catch(e){
                                            console.log(e);
                                            alert("Unknown error");
                                        }
                                        
                                    })
                                    .catch(err => console.log(err));

                                    //END LOGIN

                                }
                            })
                            .catch(e => {
                                console.log(e);
                            });
                        }}
                    >
                        Submit
                    </Button>
                    <br/><br/>
                    <Form.Text className="text-muted">
                        * required
                    </Form.Text>
                </Form>
            </Card.Body>
            </div>
        </Card>
    )
}