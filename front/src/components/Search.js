import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'

// This is not done. I realize that it looks very ugly. :(

export default function Login(){
    return(

        // <Container style = {{margin: 'auto', width: '60%', top: '50px'}}>
        //     <Row>

        //     <Form style = {{margin: 'auto', top: '50px'}}>
        //         <Form.Control type="search" placeholder="Search" />
        //     </Form>

        //     </Row>
        //     <Row>
        //         <Col>
        //     <Card style = {{margin: 'auto', top: '30px', width: '50%'}}>
        //         <Form style = {{margin: 'auto', top: '30px'}}>
        //             <Col>
        //                 <Row>
        //                     <Form.Select aria-label="Default select example">
        //                         <option>Grade</option>
        //                         <option value="1">I</option>
        //                         <option value="2">II</option>
        //                         <option value="3">III</option>
        //                         <option value="4">IV</option>
        //                     </Form.Select>
        //                 </Row>

        //                 <Row>
        //                     <Col>
        //                         <Form.Label>Min-Quality</Form.Label>
        //                         <Form.Range />
        //                     </Col>
        //                     <Col>
        //                         <Form.Label>Max-Quality</Form.Label>
        //                         <Form.Range />
        //                     </Col>
        //                 </Row>

        //                 <Row>
        //                     <Col>
        //                         <Form.Label>Min-Height</Form.Label>
        //                         <Form.Range />
        //                     </Col>
        //                     <Col>
        //                         <Form.Label>Max-Height</Form.Label>
        //                         <Form.Range />
        //                     </Col>
        //                 </Row>

        //             </Col>



        //         </Form>
        //     </Card>

        //     </Col>


        //         <Col
        //             style = {{ margin: 'auto', top: '30px', width: '50%' }}
        //         >

        //             <div style={{display: 'flex'}}>

        //             <Table bordered hover>
        //                 <thead>
        //                     <tr>
        //                     <th>Climb Name</th>
        //                     <th>Climb Type</th>
        //                     <th>Grade</th>
        //                     <th>Quality</th>
        //                     <th>Height (ft)</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     <tr>
        //                         <td>Liberty Ridge</td>
        //                         <td>Alpine</td>
        //                         <td>4</td>
        //                         <td>4.8</td>
        //                         <td>5700</td>
        //                     </tr>
        //                     <tr>
        //                         <td>Ingraham Glacier</td>
        //                         <td>Alpine</td>
        //                         <td>0</td>
        //                         <td>4.0</td>
        //                         <td>5557</td>
        //                     </tr>
        //                     <tr>
        //                         <td>North Ridge</td>
        //                         <td>Alpine</td>
        //                         <td>3</td>
        //                         <td>4.7</td>
        //                         <td>3000</td>
        //                     </tr>
        //                 </tbody>
        //                 </Table>
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>

        <Container style = {{margin: 'auto', top: '50px', width: '50%'}}>
            <br />
            
            <Form.Control size="lg" type="text" placeholder="Large text" />
            <br />

            <Card>
                <Form style = {{margin: 'auto', top: '30px'}}>
                    <Row>
                        <Col>
                            <Form.Select aria-label="Default select example">
                                <option>Grade</option>
                                <option value="1">I</option>
                                <option value="2">II</option>
                                <option value="3">III</option>
                                <option value="4">IV</option>
                            </Form.Select>
                        </Col>

                        <Col>
                            <Col>
                                <Form.Label>Min-Quality</Form.Label>
                                <Form.Range />
                            </Col>
                            <Col>
                                <Form.Label>Max-Quality</Form.Label>
                                <Form.Range />
                            </Col>
                        </Col>

                        <Col>
                            <Col>
                                <Form.Label>Min-Height</Form.Label>
                                <Form.Range />
                            </Col>
                            <Col>
                                <Form.Label>Max-Height</Form.Label>
                                <Form.Range />
                            </Col>
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