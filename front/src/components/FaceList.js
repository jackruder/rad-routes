import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Face from './Face';

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

export default function BookList({ loggedIn }){
    const [faceList, setFaceList] = useState([]);

    useEffect(() => {
        const token = getAuth();
        const headers = token ? {
            "Authorization": `Token ${token}`
        } : null;
        fetch(`${apiUrlBase}/faces/`, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => setFaceList(data))
        .catch(e => console.log(e));
    }, []);

    return (
        faceList.length > 0 ?
        <Row xs={1} md={2} style={{ width: '100%' }}>
            {faceList.map((face, idx) => (
                <Col
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Face data={face}/>
                </Col>
            ))}
        </Row>
        :
        (
            loggedIn ?
            <div style={{textAlign: 'center'}}>No Books Available</div>
            :
            <div style={{textAlign: 'center'}}>Log in to see available faces</div>
        )
    )
}