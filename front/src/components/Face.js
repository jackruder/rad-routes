import React from 'react';

import Card from 'react-bootstrap/Card';

export default function Feature({ data }) {
  const faceObj = data;

  return (
    Object.keys(faceObj).length > 1 ?
    <Card
      style={{ width: '36rem', margin: 10 }}
      onClick={() => {
        console.log(faceObj);
      }}
    >
        <Card.Body style={{ minWidth: '60%', lineHeight: '2rem'}}>
          <Card.Title>{faceObj.face_name}</Card.Title>
          <Card.Text style={{ marginTop: '1rem' }}>{faceObj.face_description}</Card.Text>
          <Card.Link>Feature</Card.Link><br/>
          <Card.Link>Climbs</Card.Link><br/>
        </Card.Body>
    </Card> : <>This Climb Does Not Exist</>
  )
}