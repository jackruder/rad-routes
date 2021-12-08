import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { fetchFromApi } from '../../util';

import FaceList from '../List/FaceList';

const defaultFeatureObj = {
    feature_name: "",
    feature_description: ""
}

export default function BookPage({ loggedIn }){
    const { id } = useParams();
    const [featureObj, setFeatureObj] = useState(defaultFeatureObj);

    useEffect(() => {
        fetchFromApi(`/features/${id}`, setFeatureObj)
    }, [id])

    return (
        <div style={{ height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>{featureObj.feature_name}</h1><br/>
                {featureObj.feature_description}<br/>
                <Link to={`/areas/${featureObj.area}`}>Area</Link>
            </div>
            <FaceList featureId={id} loggedIn={loggedIn} onPage={true}/>
        </div>
    )
}