import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchFromApi } from '../../util';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FeatureCard from '../Card/FeatureCard';

export default function BookList({ loggedIn, areaId, onPage }){
    const [featureList, setFeatureList] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        let path;
        if(areaId){
            path = `/areas/${areaId}/features`
        }
        else if (id){
            path = `/areas/${id}/features`
        }
        else{
            path = '/features/'
        }

        fetchFromApi(path, setFeatureList);
    }, [id, areaId]);

    return (
        featureList.length > 0 ?
        <Row xs={1} md={2} lg={3} style={{ width: '100%' }}>
            {featureList.map((feature, idx) => (
                <Col
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <FeatureCard
                        data={feature}
                        onPage={onPage}
                        loggedIn={loggedIn}
                        deleteThis={() => {
                            let newList = featureList.slice();
                            newList.splice(idx, 1);
                            setFeatureList(newList);
                        }}
                    />
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