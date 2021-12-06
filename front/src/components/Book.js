import React from 'react';

import Card from 'react-bootstrap/Card';

export default function Book({ data }) {
  const bookObj = data;

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
          <Card.Text> {bookObj.description} </Card.Text>
          Best Quality: <b>{bookObj.quality_max}</b> <br/>
          <Card.Link>Author</Card.Link><br/>
          <Card.Link>Areas</Card.Link><br/>
        </Card.Body>
    </Card> : <>This Climb Does Not Exist</>
  )
}