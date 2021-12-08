import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { fetchFromApi } from '../../util';

import ClimbList from '../List/ClimbList';

const defaultFaceObj = {
    face_name: "",
    face_description: ""
}

export default function BookPage({ loggedIn }){
    const { id } = useParams();
    const [faceObj, setFaceObj] = useState(defaultFaceObj);

    useEffect(() => {
        fetchFromApi(`/faces/${id}`, setFaceObj);
    }, [id])

    return (
        <div style={{ height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>{faceObj.face_name}</h1><br/>
                {faceObj.face_description}<br/>
                <Link to={`/features/${faceObj.feature}`}>Feature</Link>
            </div>
            <ClimbList faceId={id} loggedIn={loggedIn} onPage={true}/>
        </div>
    )
}