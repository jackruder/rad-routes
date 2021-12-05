import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

export default function EditFeature(){
    return (
        <Container>
        <Form style={{ margin: 'auto'}}>
            <Form.Group className="mb-3" controlId="feature_name">
                <Form.Label>Feature Name</Form.Label>
                <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="feature_description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="gps">
                <Form.Label>GPS</Form.Label>
                <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Save Changes
            </Button>
        </Form>
    </Container>
    )
}