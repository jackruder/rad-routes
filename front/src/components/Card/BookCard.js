import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchFromApi } from '../../util';

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
    fetchFromApi(`/users/${data.author}`, setAuthorObj);
  }, [data])

  return (
    !bookObj || Object.keys(bookObj).length > 1 ?
    <Card
      style={{ 
        width: '36rem',
        margin: 10,
        cursor: 'pointer'
      }}
      onClick={() => {
        console.log(bookObj);
        navigate(`/books/${bookObj.book_id}`);
      }}
    >
        <Card.Body style={{ minWidth: '60%', lineHeight: '2rem'}}>
          <Card.Title>{bookObj.book_name}</Card.Title>
          <Card.Text style={{ marginTop: '1rem' }}>{bookObj.book_description}</Card.Text>
          Best Quality: <b>{bookObj.quality_max}</b> <br/>
          <Card.Text>by {authorObj.username}</Card.Text>
        </Card.Body>
    </Card> : <>This Climb Does Not Exist</>
  )
}