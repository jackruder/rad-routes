import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const defaultFormData = {
    face_name: null,
    description: null,
    feature_id: 1,
    author: 4,
}

export default function EditFace(){
    const [formData, setFormData] = useState(defaultFormData);

    const [faceNameError, setFaceNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [featureIDError, setFeatureIDError] = useState("");

    const errorSetters = {
        face_name: setFaceNameError,
        decription: setDescriptionError,
        feature_id: setFeatureIDError,
    }

    return (
        <Container>
            <Form style={{ margin: 'auto'}}>
                <Form.Group className="mb-3" controlId="face_name">
                    <Form.Label>Face Name</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.face_name = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="face_description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                        onInput={e => {
                            let newData = formData;
                            newData.description = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="feature_id">
                    <Form.Label>Feature</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.feature_id = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group> */}

                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Face Image</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={e => {
                        e.preventDefault();

                        fetch(`${apiUrlBase}/faces/`, {
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
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Face Created',
                                    text: `Successfully created ${formData.face_name}`
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