import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiUrlBase, getAuth } from '../../util';

import Card from 'react-bootstrap/Card';

const defaultAuthorObj = {
  username: "",
  first_name: "",
  last_name: ""
}

export default function Book({ data }) {
  const bookObj = data;
  const navigate = useNavigate();
  const [authorObj, setAuthorObj] = useState(defaultAuthorObj);

  useEffect(() => {
    const token = getAuth();
    const headers = token ? {
        "Authorization": `Token ${token}`
    } : null;

    fetch(`${apiUrlBase}/users/${data.author}`, {
      method: 'GET',
      headers: headers
    })
    .then(res => res.json())
    .then(data => setAuthorObj(data))
    .catch(e => console.log(e));
  }, [data])

  return (
    Object.keys(bookObj).length > 1 ?
    <Card
      style={{ width: '36rem', margin: 10 }}
      onClick={() => {
        console.log(bookObj);
      }}
    >
        <Card.Body style={{ minWidth: '60%', lineHeight: '2rem'}}>
          <Card.Title>{bookObj.book_name}</Card.Title>
          <Card.Text style={{ marginTop: '1rem' }}>{bookObj.book_description}</Card.Text>
          Best Quality: <b>{bookObj.quality_max}</b> <br/>
          <Card.Text>by {authorObj.first_name} {authorObj.last_name}</Card.Text>
          <Card.Link onClick={() => navigate(`/books/${bookObj.book_id}`)}>Areas</Card.Link><br/>
        </Card.Body>
    </Card> : <>This Climb Does Not Exist</>
  )
}