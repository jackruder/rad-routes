import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from './SearchTable.js';
// import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { apiUrlBase, fetchFromApi, getAuth } from '../util.js';

export default function Search() {
    const [climbs, setClimbs] = useState([]);

    useEffect(() => {
        fetchFromApi("/climbs", setClimbs);
    }, []);

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

        {/* <Table data={climbs}/> */}

        <p>{JSON.stringify(climbs)}</p>

        </Container>

    )
}