import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Climb from './Climb';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const getAuth = () => {
    if(Object.keys(localStorage).indexOf("auth_token") >= 0){
        return localStorage.auth_token;
    }
    if(Object.keys(sessionStorage).indexOf("auth_token") >= 0){
        return sessionStorage.auth_token;
    }
    return null;
}

export default function ClimbList({ loggedIn }){
    const [climbList, setClimbList] = useState([]);

    useEffect(() => {
        let token = getAuth();
        if(!token) return;
        fetch(`${apiUrlBase}/climbs/`, {
            method: 'GET',
            headers: {
                "Authorization": `Token ${getAuth()}`
            }
        })
        .then(res => res.json())
        .then(data => setClimbList(data))
        .catch(e => console.log(e));
    }, []);

    return (
        climbList.length > 0 ?
        <Row xs={1} md={2} style={{ width: '100%' }}>
            {climbList.map((climb, idx) => (
                <Col
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Climb data={climb}/>
                </Col>
            ))}
        </Row>
        :
        (
            loggedIn ?
            <div style={{textAlign: 'center'}}>No Climbs Available</div>
            :
            <div style={{textAlign: 'center'}}>Log in to see available climbs</div>
        )
    )
}