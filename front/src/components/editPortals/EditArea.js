import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const defaultFormData = {
    book_id: 1, //TODO
    area_name: null,
    description: null,
    author: 4, //TODO
}

export default function EditArea(){
    const [formData, setFormData] = useState(defaultFormData);

    // const [areaError, setAreaError] = useState("");
    // const [descriptionError, setDescriptionError] = useState("");

    // const errorSetters = {
    //     area: setAreaError,
    //     decription: setDescriptionError,
    // }

    return (
        <Container>
            <Form style={{ margin: 'auto'}}>
                <Form.Group className="mb-3" controlId="area">
                    <Form.Label>Area Name</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.area_name = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                        onInput={e => {
                            let newData = formData;
                            newData.description = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={e => {
                        e.preventDefault();

                        fetch(`${apiUrlBase}/areas/`, {
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
                                    title: 'Area Created',
                                    text: `Successfully created ${formData.area_name}`
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