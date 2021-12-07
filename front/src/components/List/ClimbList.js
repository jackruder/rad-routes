import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAuth, apiUrlBase } from '../../util.js'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ClimbCard from '../Card/ClimbCard';

export default function ClimbList({ loggedIn }){
    const [climbList, setClimbList] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const token = getAuth();
        const headers = token ? {
            "Authorization": `Token ${token}`
        } : null;

        const url = id ? `${apiUrlBase}/faces/${id}/climbs/` : `${apiUrlBase}/climbs/`;

        fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => setClimbList(data))
        .catch(e => console.log(e));
    }, [id]);

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
                    <ClimbCard data={climb}/>
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