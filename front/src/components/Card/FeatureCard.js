import React from 'react';

import Card from 'react-bootstrap/Card';

export default function Feature({ data }) {
  const featureObj = data;

  return (
    Object.keys(featureObj).length > 1 ?
    <Card
      style={{ width: '36rem', margin: 10 }}
      onClick={() => {
        console.log(featureObj);
      }}
    >
        <Card.Body style={{ minWidth: '60%', lineHeight: '2rem'}}>
          <Card.Title>{featureObj.feature_name}</Card.Title>
          <Card.Text style={{ marginTop: '1rem' }}>{featureObj.feature_description}</Card.Text>
          Location: <b>{featureObj.location}</b> <br/>
          GPS: <b>{featureObj.gps}</b> <br/>
          <Card.Link>Area</Card.Link><br/>
          <Card.Link>Faces</Card.Link><br/>
        </Card.Body>
    </Card> : <>This Feature Does Not Exist</>
  )
}