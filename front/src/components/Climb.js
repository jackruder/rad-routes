import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

const getHeightString  = (height) => {
  const ft = `${Math.round(height * 3.28084)}ft`;
  const m = `${height}m`
  if(navigator.language.toLowerCase() === 'en-us'){
    return `${ft} (${m})`
  }
  else{
    return `${m} (${ft})`
  }
}

const types = {
  ropedClimb: {
    name: "Roped Climb"
  },
  boulder: {
    name: "Boulder"
  }
}

export default function Climb() {
  // these defaults should be fetched from an api in reality
  // eslint-disable-next-line
  const [type, setType] = useState(types.ropedClimb);
  // eslint-disable-next-line
  const [grade, setGrade] = useState("5.11c / V7 / 5.10a");
  // eslint-disable-next-line
  const [height, setHeight] = useState(35);

  return (
    <Card
      style={{ width: '36rem', margin: 10 }}
    >
      <div style={{display: 'flex'}}>
        <Card.Body>
          <Card.Title>Cool Climb</Card.Title>
          Type: <b>{type.name}</b> <br/> {/* roped climb vs boulder */}
          Grade: <b>{grade}</b> <br/>

          {type === types.ropedClimb || true ? 
            <div style={{flexGrow: 1}}>Height: <b>{getHeightString(height)}</b></div> :
            <></>}

          <div style={{lineHeight: '3rem'}} aria-label="Links to the face and feature on which this climb resides.">
            <Card.Link>Face</Card.Link>
            <Card.Link>Feature</Card.Link><br/>
          </div>
          <Card.Title style={{ marginTop: '1rem' }}>Description</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo ad saepe sit alias ab molestias consectetur esse magnam tempora neque.
          </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src="/test-assets/rock-climbing.jpeg" style={{ overflow: 'hidden', height: '100%' }} />
      </div>
      <Card.Body>
          <Card.Title>Getting There</Card.Title>
          <Card.Text>
            Vitae alias aperiam. A autem temporibus veritatis minima dolore deserunt.
          </Card.Text>
      </Card.Body>
    </Card>
  )
}