import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const defaultFormData = {
    feature_name: null,
    feature_description: null,
    gps: null,
    location: null,
    author: 4,  //TODO
    area_id: 1, //TODO
}

export default function EditFeature(){
    const [formData, setFormData] = useState(defaultFormData);

    // const [featureNameError, setFeatureNameError] = useState("");
    // const [featureDescriptionError, setFeatureDescriptionError] = useState("");
    // const [gpsError, setGpsError] = useState("");
    // const [locationError, setLocationError] = useState("");

    // const errorSetters = {
    //     feature_name: setFeatureNameError,
    //     feature_description: setFeatureDescriptionError,
    //     gps: setGpsError,
    //     location: setLocationError,
    // }

    return (
        <Container>
        <Form style={{ margin: 'auto'}}>
            <Form.Group className="mb-3" controlId="feature_name">
                <Form.Label>Feature Name</Form.Label>
                <Form.Control type="text" placeholder="" 
                    onInput={e => {
                        let newData = formData;
                        newData.feature_name = e.target.value;
                        setFormData(newData);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="feature_description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} 
                    onInput={e => {
                        let newData = formData;
                        newData.feature_description = e.target.value;
                        setFormData(newData);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="gps">
                <Form.Label>GPS</Form.Label>
                <Form.Control type="text" placeholder="" 
                    onInput={e => {
                        let newData = formData;
                        newData.gps = e.target.value;
                        setFormData(newData);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control as="textarea" rows={3} 
                    onInput={e => {
                        let newData = formData;
                        newData.location = e.target.value;
                        setFormData(newData);
                    }}
                />
            </Form.Group>

            <Button 
                    variant="primary" 
                    type="submit"
                    onClick={e => {
                        e.preventDefault();

                        fetch(`${apiUrlBase}/features/`, {
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
                                    title: 'Feature Created',
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