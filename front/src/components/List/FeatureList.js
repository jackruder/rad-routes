import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiUrlBase, getAuth } from '../../util';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FeatureCard from '../Card/FeatureCard';

export default function BookList({ loggedIn }){
    const [featureList, setFeatureList] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const token = getAuth();
        const headers = token ? {
            "Authorization": `Token ${token}`
        } : null;

        const url =  id ? `${apiUrlBase}/areas/${id}/features/` : `${apiUrlBase}/features/`;

        fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => setFeatureList(data))
        .catch(e => console.log(e));
    }, [id]);

    return (
        featureList.length > 0 ?
        <Row xs={1} md={2} style={{ width: '100%' }}>
            {featureList.map((feature, idx) => (
                <Col
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <FeatureCard data={feature}/>
                </Col>
            ))}
        </Row>
        :
        (
            loggedIn ?
            <div style={{textAlign: 'center'}}>No Features Available</div>
            :
            <div style={{textAlign: 'center'}}>Log in to see available features</div>
        )
    )
}