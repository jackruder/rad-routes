import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

export default function EditClimb(){
    return (
        <Container>
            <Form style={{ margin: 'auto'}}>
                <Form.Group className="mb-3" controlId="climb_name">
                    <Form.Label>Climb Name</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="climb_type">
                    <Form.Label>Climb Type</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="face_id">
                    <Form.Label>Face</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Height</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Climb Image</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </Container>
    )
}