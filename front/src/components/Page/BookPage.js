import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAuth, apiUrlBase } from '../../util';

import AreaList from '../List/AreaList';

const defaultObj = {
    book_name: "",
    book_description: ""
}

export default function BookPage({ loggedIn }){
    const { id } = useParams();
    const [bookObj, setBookObj] = useState(defaultObj);

    useEffect(() => {
        const token = getAuth();
        const headers = token ? {
            "Authorization": `Token ${token}`
        } : null;

        fetch(`${apiUrlBase}/books/${id}`, {
            method: 'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => setBookObj(data))
        .catch(e => console.log(e));

    }, [id])

    return (
        <div style={{ height: '100%' }}>
        <h1>{bookObj.book_name}</h1><br/>
        {bookObj.book_description}
        <AreaList bookId={id} loggedIn={loggedIn} onPage={true}/>
        </div>
    )
}