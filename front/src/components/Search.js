import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

export default function Login(){
    return(

        <Container style = {{margin: 'auto', top: '50px', width: '50%'}}>
            <br />

            <Form.Control size="lg" type="text" placeholder="Search" />
            <br />

            <Card>
                <Form style = {{margin: 'auto', top: '30px', width: '90%'}}>
                    <Row>
                        <Col style = {{margin: '10px'}}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Grade</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Select</option>
                                    <option value="1">I</option>
                                    <option value="2">II</option>
                                    <option value="3">III</option>
                                    <option value="4">IV</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col style = {{margin: '10px'}}>
                            <Row>
                                <Form.Label>Min-Quality</Form.Label>
                                <Form.Range />
                            </Row>
                            <Row>
                                <Form.Label>Max-Quality</Form.Label>
                                <Form.Range />
                            </Row>
                        </Col>

                        <Col style = {{margin: '10px'}}>
                            <Row>
                                <Form.Label>Min-Height</Form.Label>
                                <Form.Range />
                            </Row>
                            <Row>
                                <Form.Label>Max-Height</Form.Label>
                                <Form.Range />
                            </Row>
                        </Col>

                    </Row>
                </Form>
            </Card>
            <br />

            <Table bordered hover>
                <thead>
                    <tr>
                    <th>Climb Name</th>
                    <th>Climb Type</th>
                    <th>Grade</th>
                    <th>Quality</th>
                    <th>Height (ft)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Liberty Ridge</td>
                        <td>Alpine</td>
                        <td>4</td>
                        <td>4.8</td>
                        <td>5700</td>
                    </tr>
                    <tr>
                        <td>Ingraham Glacier</td>
                        <td>Alpine</td>
                        <td>0</td>
                        <td>4.0</td>
                        <td>5557</td>
                    </tr>
                    <tr>
                        <td>North Ridge</td>
                        <td>Alpine</td>
                        <td>3</td>
                        <td>4.7</td>
                        <td>3000</td>
                    </tr>
                </tbody>
            </Table>

        </Container>

    )
}