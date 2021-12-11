import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';
import { getAuth, apiUrlBase } from '../../util';

const defaultFormData = {
    book_name: null,
    book_description: null,
    public: false,
    listed: false,
    grade_hist: "1, 4, 3",
}

export default function EditBook(){
    const [formData, setFormData] = useState(defaultFormData);

    return (
        <Container>
            <Form style={{ margin: 'auto'}}>
                <Form.Group className="mb-3" controlId="area">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.book_name = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="book_description">
                    <Form.Label>Book Description</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                        onInput={e => {
                            let newData = formData;
                            newData.book_description = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                <Form.Check 
                    type={'checkbox'}
                    id={`public`}
                    label={`Public`}
                    onInput={e => {
                        let newData = formData;
                        newData.public = e.target.checked;
                        setFormData(newData);
                    }}
                />

                <Form.Check 
                    type={'checkbox'}
                    id={`listed`}
                    label={`Listed`}
                    onInput={e => {
                        let newData = formData;
                        newData.listed = e.target.checked;
                        setFormData(newData);
                    }}
                />

                <br />

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={e => {
                        e.preventDefault();

                        const token = getAuth();
                        let headers = {
                            'Content-Type': 'application/json'
                        }
                        if(token){
                            headers['Authorization'] = `Token ${token}`;
                        }

                        fetch(`${apiUrlBase}/books/`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(formData)
                        })
                        .then(res => {
                            if(res.ok){
                                return res.json();
                            }
                            const contentType = res.headers.get("content-type");
                            if (contentType && contentType.indexOf("application/json") !== -1) {
                                return res.json().then(data => {
                                    if(Object.keys(data).indexOf('detail') >= 0){
                                        throw Error(data.detail);
                                    }
                                    else{
                                        let err;
                                        try{
                                            err = JSON.stringify(data);
                                        }
                                        catch(e){
                                            throw Error("unknown error");
                                        }
                                        throw Error(err);

                                    }
                                });
                            }
                        })
                        .then(data => {
                            console.log(data);

                            if(Object.keys(data).indexOf('detail') >= 0){
                                Swal.fire({
                                    icon: 'error',
                                    text: data.detail
                                });
                            }
                            else {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Book Created',
                                    text: `Successfully created book ${formData.book_name}`
                                });
                            }
                        })
                        .catch(e => {
                            console.log(e);
                            Swal.fire({
                                icon: 'error',
                                text: e
                            })
                        });
                    }}
                >
                    Save Changes
                </Button>
            </Form>
        </Container>
    )
}