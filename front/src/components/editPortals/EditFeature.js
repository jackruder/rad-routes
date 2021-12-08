import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

import { fetchFromApi, getAuth } from '../../util';

import BookSelector from './selectors/BookSelector';
import AreaSelector from './selectors/AreaSelector';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const defaultFormData = {
    feature_name: null,
    feature_description: null,
    gps: null,
    location: null,
    area: null
}

export default function EditFeature(){
    const [formData, setFormData] = useState(defaultFormData);

    const [editableBooks, setEditableBooks] = useState(null);
    const [editableAreas, setEditableAreas] = useState(null);

    useEffect(() => {
        fetchFromApi("/owned/", setEditableBooks);
    }, []);

    return (
        editableBooks ?
        <>
        { editableBooks.length > 0 ?
        <Container>
            <Form style={{ margin: 'auto'}}>
                <BookSelector setEditableAreas={setEditableAreas} editableBooks={editableBooks} />

                <AreaSelector formData={formData} setFormData={setFormData} editableAreas={editableAreas} />

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

                        const token = getAuth();
                        let headers = {
                            'Content-Type': 'application/json'
                        }
                        if(token){
                            headers['Authorization'] = `Token ${token}`;
                        }

                        fetch(`${apiUrlBase}/features/`, {
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
                                    title: 'Feature Created',
                                    text: `Successfully created feature ${formData.feature_name} (id ${data.feature_id})`
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