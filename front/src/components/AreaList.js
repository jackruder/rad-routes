import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Area from './Area';

export const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

export const getAuth = () => {
    if(Object.keys(localStorage).indexOf("auth_token") >= 0){
        return localStorage.auth_token;
    }
    if(Object.keys(sessionStorage).indexOf("auth_token") >= 0){
        return sessionStorage.auth_token;
    }
    return null;
}

export default function AreaList({ loggedIn }){
    const [areaList, setAreaList] = useState([]);

    useEffect(() => {
        const token = getAuth();
        const headers = token ? {
            "Authorization": `Token ${token}`
        } : null;
        fetch(`${apiUrlBase}/areas/`, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => setAreaList(data))
        .catch(e => console.log(e));
    }, []);

    return (
        areaList.length > 0 ?
        <Row xs={1} md={2} style={{ width: '100%' }}>
            {areaList.map((area, idx) => (
                <Col
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Area data={area}/>
                </Col>
            ))}
        </Row>
        :
        (
            loggedIn ?
            <div style={{textAlign: 'center'}}>No Books Available</div>
            :
            <div style={{textAlign: 'center'}}>Log in to see available books</div>
        )
    )
}