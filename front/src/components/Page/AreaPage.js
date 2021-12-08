import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchFromApi } from '../../util';

import FeatureList from '../List/FeatureList';

const defaultAreaObj = {
    area_name: "",
    area_description: "",
    book: ""
}

export default function BookPage({ loggedIn }){
    const { id } = useParams();
    const [areaObj, setAreaObj] = useState(defaultAreaObj);

    useEffect(() => {
        fetchFromApi(`/areas/${id}`, setAreaObj);
    }, [id])

    return (
        <div style={{ height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>{areaObj.area_name}</h1><br/>
                {areaObj.area_description} <br/>
                <Link to={`/books/${areaObj.book}`}>Guidebook</Link>
            </div>
            <FeatureList areaId={id} loggedIn={loggedIn} onPage={true}/>
        </div>
    )
}