import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

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

const images = {
  "Cartilage": "/static/assets/cartilage.png",
  "Jagged Jaw": "/static/assets/jagged.jpg",
  "In-N-Out": "/static/assets/in-n-out.png"
}

export default function Climb({ data, onPage }) {
  const climbObj = data;
  const navigate = useNavigate();

  return (
    Object.keys(climbObj).length > 1 ?
    <Card
      style={{ width: '36rem', margin: 10 }}
    >
      <div style={{display: 'flex'}}>
        <Card.Body style={{ minWidth: '60%', lineHeight: '2rem'}}>
          <Card.Title>{climbObj.climb_name}</Card.Title>
          Type: <b>{climbObj.climb_type}</b> <br/>
          Grade: <b>{climbObj.grade}</b> <br/>

          <div style={{flexGrow: 1}}>Height: <b>{getHeightString(climbObj.height)}</b></div>

          {!onPage ? 
            <>
              <Card.Link onClick={() => navigate(`/faces/${climbObj.face}`)}>Face</Card.Link><br/>
            </>
            : <></>}
        </Card.Body>
        <div style={{
          width: '100%',
          backgroundImage: `url(${images[climbObj.climb_name]})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}/>
      </div>
      <Card.Body>
          <Card.Title style={{ marginTop: '1rem' }}>Description</Card.Title>
          <Card.Text> {climbObj.description} </Card.Text>
          <Card.Title>Getting There</Card.Title>
          <Card.Text>
            Vitae alias aperiam. A autem temporibus veritatis minima dolore deserunt.
          </Card.Text>
      </Card.Body>
    </Card> : <>This Climb Does Not Exist</>
  )
}