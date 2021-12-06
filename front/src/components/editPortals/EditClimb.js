import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const defaultFormData = {
    author: 4,  //TODO
    climb_name: null,
    climb_type: null,
    face_id: 1, //TODO
    grade: null,
    height: null,
    description: null,
}

export default function EditClimb(){
    const [formData, setFormData] = useState(defaultFormData);

    const [nameError, setNameError] = useState("");
    const [typeError, setTypeError] = useState("");
    const [gradeError, setGradeError] = useState("");
    const [faceError, setFaceError] = useState("");
    const [heightError, setHeightError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const errorSetters = {
        climb_name: setNameError,
        climb_type: setTypeError,
        grade: setGradeError,
        face_id: setFaceError,
        height: setHeightError,
        decription: setDescriptionError,
    }

    return (
        <Container>
            <Form style={{ margin: 'auto'}}>
                <Form.Group className="mb-3" controlId="climb_name">
                    <Form.Label>Climb Name</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.climb_name = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="climb_type">
                    <Form.Label>Climb Type</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.climb_type = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.grade = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="face_id">
                    <Form.Label>Face</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.face_id = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Height</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            let newData = formData;
                            newData.height = e.target.value;
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

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Climb Image</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={e => {
                        e.preventDefault();

                        fetch(`${apiUrlBase}/climbs/`, {
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
                                    title: 'Climb Created',
                                    text: `Successfully created ${formData.climb_name}`
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