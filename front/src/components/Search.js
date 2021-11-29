import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export default function Login(){
    return(

        <div style = {{margin: 'auto', top: '50px'}}>
        <Form style = {{margin: 'auto', top: '50px', width: '50%'}}>
            <Form.Control type="search" placeholder="Search" />
        </Form>

        <Card
            style={{   margin: 'auto', top: '30px', width: '50%' }}
        >
            <div style={{display: 'flex'}}>
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
            </div>
        </Card>
        </div>

    )
}