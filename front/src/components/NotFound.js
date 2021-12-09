import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export default function NotFound(){
    const navigate = useNavigate();

    return (
        <div style={{ 
            height: '100%',
            display: 'grid', 
            placeItems: 'center',
            fontSize: 48 
        }}>
            <div style={{
                textAlign:'center'
            }}>
                404: page not found <br/>
                <Button
                    variant="dark"
                    onClick={() => {
                        navigate("/books"); 
                    }}
                >
                    Explore Guidebooks</Button>
            </div>
        </div>
    )
}