import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Climb from './Climb';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

export default function ClimbList(){
    const [climbList, setClimbList] = useState([]);

    useEffect(() => {
        fetch(`${apiUrlBase}/climbs/`)
        .then(res => res.json())
        .then(data => setClimbList(data))
        .catch(e => console.log(e));
    }, []);

    return (
        <Row xs={1} md={2} style={{ width: '100%' }}>
            {climbList.map(climb => (
            <Col style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Climb data={climb}/>
            </Col>
            ))}
        </Row>
    )
}