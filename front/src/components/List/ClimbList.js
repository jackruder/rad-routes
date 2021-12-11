import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchFromApi } from '../../util.js'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ClimbCard from '../Card/ClimbCard';

export default function ClimbList({ loggedIn, faceId, onPage }){
    const [climbList, setClimbList] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        let path;
        if(faceId){
            path = `/faces/${faceId}/climbs`
        }
        else if(id){
            path = `/faces/${id}/climbs`
        }
        else{
            path = 'climbs'
        }

        fetchFromApi(path, setClimbList);
    }, [id, faceId]);

    return (
        climbList.length > 0 ?
        <Row xs={1} md={2} lg={3} style={{ width: '100%' }}>
            {climbList.map((climb, idx) => (
                <Col
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <ClimbCard
                        onPage={onPage}
                        data={climb}
                        loggedIn={loggedIn}
                        deleteThis={() => {
                            let newList = climbList.slice();
                            newList.splice(idx, 1);
                            setClimbList(newList);
                        }}
                    />
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