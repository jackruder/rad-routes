import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import EditClimb from './editPortals/EditClimb.js';
import EditArea from './editPortals/EditArea.js';
import EditFeature from './editPortals/EditFeature.js';
import EditFace from './editPortals/EditFace.js';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

export default function EditPortal(){

    const [selectedForm, setForm] = useState('Climb');

    const renderForm = React.useCallback(() => {
        switch(selectedForm) {
            case 'Climb': 
                return <EditClimb />;
          
            case 'Area': 
                return <EditArea />;
    
            case 'Feature': 
                return <EditFeature />;
    
            case 'Face': 
                return <EditFace />;
    
            default: 
                return null;
          
        }
    }, [selectedForm]);

    return(
        <Card
            style={{   margin: 'auto', top: '50px', width: '50%' }}
        >
        
            <Card.Body>
                <Row>
                    <Card.Title>Edit</Card.Title>

                    <Form.Select style= {{margin: 'auto', width: '50%'}}size="lg"
                        onChange={e => {
                            setForm(e.target.value);
                        }}
                    >
                        <option value={"Climb"}>Climb</option>
                        <option value={"Area"}>Area</option>
                        <option value={"Feature"}>Feature</option>
                        <option value={"Face"}>Face</option>

                    </Form.Select>
                </Row>

                <br />

                {renderForm()}

            </Card.Body>
        </Card>
    )
}