import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAuth, apiUrlBase } from '../../util';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FaceCard from '../Card/FaceCard';

export default function BookList({ loggedIn }){
    const [faceList, setFaceList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const token = getAuth();
        const headers = token ? {
            "Authorization": `Token ${token}`
        } : null;

        const url = id ? `${apiUrlBase}/features/${id}/faces` : `${apiUrlBase}/faces`;

        fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => setFaceList(data))
        .catch(e => console.log(e));
    }, [id]);

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
                    <FaceCard data={face}/>
                </Col>
            ))}
        </Row>
        :
        (
            loggedIn ?
            <div style={{textAlign: 'center'}}>No Faces Available</div>
            :
            <div style={{textAlign: 'center'}}>Log in to see available faces</div>
        )
    )
}