import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAuth, apiUrlBase } from '../../util';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AreaCard from '../Card/AreaCard';

export default function AreaList({ loggedIn, bookId, onPage }){
    const [areaList, setAreaList] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const token = getAuth();
        const headers = token ? {
            "Authorization": `Token ${token}`
        } : null;

        let url;
        if(bookId){
            url = `${apiUrlBase}/books/${bookId}/areas/`
        }
        else if(id){
            url = `${apiUrlBase}/books/${id}/areas/`;
        }
        else{
            url = `${apiUrlBase}/areas/`;
        }

        fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => setAreaList(data))
        .catch(e => console.log(e));
    }, [id, bookId]);

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