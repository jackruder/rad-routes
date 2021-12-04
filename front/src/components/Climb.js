import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const apiUrlBase = process.env.NODE_ENV === 'production' ? 'http://radroutes.guide/api' : 'http://localhost:8000/api';

const getHeightString = (height) => {
  const ft = `${Math.round(height * 3.28084)}ft`;
  const m = `${height}m`
  if(navigator.language.toLowerCase() === 'en-us'){
    return `${ft} (${m})`
  }
  else{
    return `${m} (${ft})`
  }
}

export default function Climb() {
  const { id } = useParams();
  const [climbObj, setClimbObj] = useState({ placeholder: null });

  useEffect(() => {
    fetch(`${apiUrlBase}/climbs/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setClimbObj(data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    Object.keys(climbObj).length > 1 ?
    <Card
      style={{ width: '36rem', margin: 10 }}
    >
      <div style={{display: 'flex'}}>
        <Card.Body>
          <Card.Title>{climbObj.climb_name}</Card.Title>
          Type: <b>{climbObj.climb_type}</b> <br/>
          Grade: <b>{climbObj.grade}</b> <br/>

          <div style={{flexGrow: 1}}>Height: <b>{getHeightString(climbObj.height)}</b></div>

          <div style={{lineHeight: '3rem'}} aria-label="Links to the face and feature on which this climb resides.">
            <Card.Link>Face</Card.Link>
            <Card.Link>Feature</Card.Link><br/>
          </div>
          <Card.Title style={{ marginTop: '1rem' }}>Description</Card.Title>
          <Card.Text style={{minWidth: '20rem', maxWidth: '20rem'}}>
            {climbObj.description}
          </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src="/static/assets/rock-climbing.jpeg" style={{ overflow: 'hidden', height: '100%' }} />
      </div>
      <Card.Body>
          <Card.Title>Getting There</Card.Title>
          <Card.Text>
            Vitae alias aperiam. A autem temporibus veritatis minima dolore deserunt.
          </Card.Text>
      </Card.Body>
    </Card> : <>This Climb Does Not Exist</>
  )
}