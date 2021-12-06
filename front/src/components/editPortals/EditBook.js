import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const defaultFormData = {
    book_name: null,
    book_description: null,
    author: 4,  //TODO
    public: false,
    listed: false,
    grade_hist: "1, 4, 3",
}

export default function EditBook(){
    const [formData, setFormData] = useState(defaultFormData);

    // const errorSetters = {
    // }

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

                        fetch(`${apiUrlBase}/books/`, {
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
                                        // errorSetters[key](data[key][0]);
                                    }
                                }
                                // else if (Object.keys(errorSetters).indexOf(key) >= 0){
                                //     errorSetters[key]("");
                                // }
                            }
                            if(!err){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Book Created',
                                    text: `Successfully created ${formData.book_name}`
                                });
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    }}
                >
                    Save Changes
                </Button>
            </Form>
        </Container>
    )
}