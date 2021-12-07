import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';


export default function AreaCard({ data, onPage }) {
  const areaObj = data;
  const navigate = useNavigate();

  return (
    Object.keys(areaObj).length > 1 ?
    <Card
      style={{ width: '36rem', margin: 10 }}
      onClick={() => {
        console.log(areaObj);
      }}
    >
        <Card.Body style={{ minWidth: '60%', lineHeight: '2rem'}}>
          <Card.Title>{areaObj.area_name}</Card.Title>
          <Card.Text style={{ marginTop: '1rem' }}>{areaObj.area_description}</Card.Text>
          Quality: <b>{areaObj.area_quality}</b> <br/>
          {!onPage ?
            <>
              <Card.Link onClick={() => navigate(`/books/${areaObj.book}`)}>Guidebook</Card.Link><br/>
            </>
          : <></>}
          <Card.Link>Features</Card.Link><br/>
        </Card.Body>
    </Card> : <>This Climb Does Not Exist</>
  )
}