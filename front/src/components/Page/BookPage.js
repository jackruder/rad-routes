import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAuth, apiUrlBase } from '../../util';

import AreaList from '../List/AreaList';

const defaultBookObj = {
    book_name: "",
    book_description: ""
}

const defaultAuthorObj = {
    username: "",
    first_name: "",
    last_name: ""
}

const fetchAuthor = (author_id, setAuthorObj, headers) => {
    fetch(`${apiUrlBase}/users/${author_id}`, {
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(data => setAuthorObj(data))
    .catch(e => console.log(e));
}

export default function BookPage({ loggedIn }){
    const { id } = useParams();
    const [bookObj, setBookObj] = useState(defaultBookObj);
    const [authorObj, setAuthorObj] = useState(defaultAuthorObj);

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
        .then(data => {
            setBookObj(data)
            fetchAuthor(data.author, setAuthorObj, headers);
        })
        .catch(e => console.log(e));
    }, [id])

    return (
        <div style={{ height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>{bookObj.book_name}</h1><br/>
                <h4>by {authorObj.first_name} {authorObj.last_name}</h4><br/>
                {bookObj.book_description}
            </div>
            <AreaList bookId={id} loggedIn={loggedIn} onPage={true}/>
        </div>
    )
}