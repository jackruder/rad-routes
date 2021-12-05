import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

export default function EditFace(){
    return (
        <Container>
            <Form style={{ margin: 'auto'}}>
                <Form.Group className="mb-3" controlId="face_name">
                    <Form.Label>Face Name</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="face_description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="feature_id">
                    <Form.Label>Feature</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Face Image</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </Container>
    )
}