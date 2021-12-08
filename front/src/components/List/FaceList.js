import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchFromApi } from '../../util';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FaceCard from '../Card/FaceCard';

export default function BookList({ loggedIn, featureId, onPage }){
    const [faceList, setFaceList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        let path;
        if(featureId){
            path = `/features/${featureId}/faces`
        }
        else if(id){
            path = `/features/${id}/faces`
        }
        else{
            path = "/faces"
        }

        fetchFromApi(path, setFaceList);
    }, [id, featureId]);

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
                    <FaceCard onPage={onPage} data={face}/>
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