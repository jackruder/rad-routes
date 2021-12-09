import React, { useEffect, useState } from 'react';

import { getAuth, fetchFromApi, formFieldErrorRed } from '../../util';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Swal from 'sweetalert2';

import BookSelector from './selectors/BookSelector';

import { apiUrlBase } from '../../util';

const defaultFormData = {
    book: null,
    area_name: null,
    area_description: null
}

export default function EditArea(){
    const [formData, setFormData] = useState(defaultFormData);
    const [editableBooks, setEditableBooks] = useState(null);

    const [nameBg, setNameBg] = useState(null);

    const [formDisabled, setFormDisabled] = useState(true);

    useEffect(() => {
        fetchFromApi("/owned/", setEditableBooks);
    }, [])

    return (
        editableBooks ?
        <>
            {editableBooks.length > 0 ?
            <Container>
                <Form style={{ margin: 'auto'}}>
                    <BookSelector onChange={() => setFormDisabled(false)} formData={formData} setFormData={setFormData} editableBooks={editableBooks} />

                    <Form.Group className="mb-3" controlId="area">
                        <Form.Label>Area Name*</Form.Label>
                        <Form.Control type="text" placeholder=""
                            style={{
                                background: nameBg
                            }}
                            onInput={e => {
                                if(e.target.value === ""){
                                    setNameBg(formFieldErrorRed);
                                    setFormDisabled(true);
                                }
                                else{
                                    setNameBg(null);
                                    let newData = formData;
                                    newData.area_name = e.target.value;
                                    setFormData(newData);
                                    setFormDisabled(false);
                                }
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            onInput={e => {
                                let newData = formData;
                                newData.area_description = e.target.value;
                                setFormData(newData);
                            }}
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit"
                        disabled={formDisabled}
                        onClick={e => {
                            e.preventDefault();

                            console.log(formData);

                            if(formData.area_name === null){
                                setNameBg(formFieldErrorRed);
                                return;
                            }

                            const token = getAuth();
                            let headers = {
                                'Content-Type': 'application/json'
                            }
                            if(token){
                                headers['Authorization'] = `Token ${token}`;
                            }

                            fetch(`${apiUrlBase}/areas/`, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify(formData)
                            })
                            .then(res => {
                                const contentType = res.headers.get("content-type");
                                if (contentType && contentType.indexOf("application/json") !== -1) {
                                    return res.json().then(data => {
                                        if(Object.keys(data).indexOf('detail') >= 0){
                                            throw Error(data.detail);
                                        }
                                        else{
                                            throw Error(JSON.stringify(data))
                                        }
                                    });
                                }
                                if(res.ok){
                                    return res.json();
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
                                        title: 'Area Created',
                                        text: `Successfully created area ${formData.area_name}`
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
            :
            <>You don't have any books yet!</>}
        </>
        :
        <></>
    )
}