import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchFromApi } from '../../util';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AreaCard from '../Card/AreaCard';

export default function AreaList({ loggedIn, bookId, onPage }){
    const [areaList, setAreaList] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        let path;
        if(bookId){
            path = `/books/${bookId}/areas/`
        }
        else if(id){
            path = `/books/${id}/areas/`;
        }
        else{
            path = `/areas/`;
        }

        fetchFromApi(path, setAreaList);
    }, [id, bookId]);

    return (
        areaList.length > 0 ?
        <Row xs={1} md={2} lg={3} style={{ width: '100%' }}>
            {areaList.map((area, idx) => (
                <Col
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <AreaCard data={area} onPage={onPage}/>
                </Col>
            ))}
        </Row>
        :
        (
            loggedIn ?
            <div style={{textAlign: 'center'}}>No Areas Available</div>
            :
            <div style={{textAlign: 'center'}}>Log in to see available areas</div>
        )
    )
}