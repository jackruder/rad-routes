import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import EditClimb from './editPortals/EditClimb.js';
import EditArea from './editPortals/EditArea.js';
import EditFeature from './editPortals/EditFeature.js';
import EditFace from './editPortals/EditFace.js';
import EditBook from './editPortals/EditBook.js';

export const selectorStyle = {
    marginLeft: 20,
    width: 'clamp(200px, 25%, 400px)',
}

export const selectorSize = "md";

export default function EditPortal(){

    const [selectedForm, setForm] = useState('Book');

    const renderForm = () => {
        switch(selectedForm) {
            case 'Climb': 
                return <EditClimb />;
          
            case 'Area': 
                return <EditArea />;
    
            case 'Feature': 
                return <EditFeature />;
    
            case 'Face': 
                return <EditFace />;

            case 'Book': 
                return <EditBook />;
    
            default: 
                return null;
          
        }
    }

    return(
        <Card
            style={{   margin: 'auto', top: '50px', width: '50%' }}
        >
        
            <Card.Body>
                <div style={{ display: 'flex' }}>
                    <Card.Title style={{ lineHeight: 2 }}>Create a new</Card.Title>

                    <Form.Select
                        style={{
                            marginLeft: 20,
                            width: 'clamp(200px, 25%, 400px)',
                        }}
                        size="lg"
                        onChange={e => {
                            setForm(e.target.value);
                        }}
                    >
                        <option value="Book">Book</option>
                        <option value="Area">Area</option>
                        <option value="Feature">Feature</option>
                        <option value="Face">Face</option>
                        <option value="Climb">Climb</option>

                    </Form.Select>
                </div>

                <br />

                {renderForm()}

            </Card.Body>
        </Card>
    )
}