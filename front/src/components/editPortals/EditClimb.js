import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

import BookSelector from './selectors/BookSelector';
import AreaSelector from './selectors/AreaSelector';
import FeatureSelector from './selectors/FeatureSelector';
import FaceSelector from './selectors/FaceSelector';

import { fetchFromApi, getAuth } from '../../util';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const defaultFormData = {
    climb_name: null,
    climb_type: null,
    face_id: null, //TODO
    grade: null,
    height: null,
    description: null,
}

export default function EditClimb(){
    const [formData, setFormData] = useState(defaultFormData);

    const [editableBooks, setEditableBooks] = useState(null);
    const [editableAreas, setEditableAreas] = useState(null);
    const [editableFeatures, setEditableFeatures] = useState(null);
    const [editableFaces, setEditableFaces] = useState(null);

    const [formDisabled, setFormDisabled] = useState(true);

    useEffect(() => {
        fetchFromApi(`/owned/`, setEditableBooks);
    }, [])

    return (
        editableBooks ?
        <>
        { editableBooks.length > 0 ?
        <Container>
            <Form style={{ margin: 'auto'}}>
                <BookSelector editableBooks={editableBooks} setEditableAreas={setEditableAreas} />
                
                <AreaSelector editableAreas={editableAreas} setEditableFeatures={setEditableFeatures} />

                <FeatureSelector editableFeatures={editableFeatures} setEditableFaces={setEditableFaces} />

                <FaceSelector onChange={() => setFormDisabled(false)} formData={formData} setFormData={setFormData} editableFaces={editableFaces} />

                <Form.Group className="mb-3" controlId="climb_name">
                    <Form.Label>Climb Name*</Form.Label>
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

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Height (m)</Form.Label>
                    <Form.Control type="text" placeholder="" 
                        onInput={e => {
                            if((Number.isInteger(parseInt(e.target.value))) || (e.target.value === "")){
                                let newData = formData;
                                newData.height = parseInt(e.target.value);
                                setFormData(newData);

                            }
                            else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Height must be a number',
                                    text: `Please Try Again.`
                                });
                                e.target.value = "";
                            }
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
                    disabled={formDisabled}
                    onClick={e => {
                        e.preventDefault();

                        const token = getAuth();
                        let headers = {
                            'Content-Type': 'application/json'
                        }
                        if(token){
                            headers['Authorization'] = `Token ${token}`;
                        }

                        fetch(`${apiUrlBase}/climbs/`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(formData)
                        })
                        .then(res => {
                            if(!res.ok && res.status >= 500){
                                throw Error(res.statusText);
                            }
                            return res.json();
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
                                    title: 'Climb Created',
                                    text: `Successfully created climb ${formData.climb_name} (id ${data.climb_id})`
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
        : <>Nothing available</>}
        </>
        : 
        <></>
    )
}