import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

import BookSelector from './selectors/BookSelector';
import AreaSelector from './selectors/AreaSelector';
import FeatureSelector from './selectors/FeatureSelector';
import { getAuth, fetchFromApi, apiUrlBase } from '../../util';

const defaultFormData = {
    face_name: null,
    description: null,
    feature_id: null
}

export default function EditFace(){
    const [formData, setFormData] = useState(defaultFormData);

    const [editableBooks, setEditableBooks] = useState(null);
    const [editableAreas, setEditableAreas] = useState(null);
    const [editableFeatures, setEditableFeatures] = useState(null);

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

                <FeatureSelector onChange={() => setFormDisabled(false)} formData={formData} setFormData={setFormData} editableFeatures={editableFeatures} />

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
                            newData.face_description = e.target.value;
                            setFormData(newData);
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Face Image</Form.Label>
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

                        fetch(`${apiUrlBase}/faces/`, {
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
                                        try{
                                            throw Error(JSON.stringify(data));
                                        }
                                        catch(e){
                                            throw Error("unknown error");
                                        }
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
                                    title: 'Face Created',
                                    text: `Successfully created face ${formData.face_name} (id ${data.face_id})`
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
        : <>Nothing available</>}
        </>
        : 
        <></>
    )
}