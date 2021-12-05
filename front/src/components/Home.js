import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const buttons = [
    {
        text: "Climb of the Day"
    },
    {
        text: "Random Climb"
    }
]

export default function Home() {
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: "url(/static/assets/banner-1.jpg)",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <div style={{ display: 'flex' }}>
                <div id="title" style={{
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: 72,
                        animation: "splash 1s normal forwards ease-in-out",
                    }}>
                        "Rad Route, Dude"
                    </h1>
                    <br/>
                    <Row xs={1} md={2} style={{ width: '65%', margin: 'auto' }}>
                        {buttons.map((btn, idx) => (
                            <Col 
                                key={idx}
                                style={{
                                    marginTop: 10
                                }}>
                                <Button variant="dark">{btn.text}</Button>
                            </Col>
                            // TODO add vertical padding here
                        ))}
                    </Row>
                    
                </div>
                <div style={{ minWidth: '33vw' }}/>
            </div>
        </div>
    )
}