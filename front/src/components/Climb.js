import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

import UnitDropdown from './UnitDropdown';
import { RouteDifficulty, BoulderDifficulty } from '../objects/Units';

const getDifficulty = (grade, gradeUnit) => {
  // bounds checking: grade must be in [0, 1)
  // grade must be less than 1 (not equal to 1)
  if (grade < 0){
    grade = 0;
  }
  else if (grade >= 1){
    grade = 0.99;
  }

  // take the value that is 100*grade percent of the way through the relevant list
  return gradeUnit.values[Math.floor(grade * gradeUnit.values.length)]
}

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
    name: "Roped Climb",
    defaultUnit: RouteDifficulty.yosemite
  },
  boulder: {
    name: "Boulder",
    defaultUnit: BoulderDifficulty.vScale
  }
}

export default function Climb() {
  // these defaults should be fetched from an api in reality
  // eslint-disable-next-line
  const [type, setType] = useState(types.ropedClimb);
  // eslint-disable-next-line
  const [grade, setGrade] = useState(0.7);
  const [gradeUnit, setGradeUnit] = useState(type.defaultUnit);
  const [gradeString, setGradeString] = useState(getDifficulty(grade, gradeUnit))

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

          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{flexGrow: 1}}>Grade: <b>{gradeString}</b></div>
            <UnitDropdown
              label="Grading System"
              unitList={Object.values(type === types.boulder ? BoulderDifficulty : RouteDifficulty)}
              onSelect={(unitVarName) => {
                const newUnit = (type === types.boulder ? BoulderDifficulty : RouteDifficulty)[unitVarName]
                setGradeUnit(newUnit);
                setGradeString(getDifficulty(grade, newUnit)); // gradeUnit doesnt seem to actually update in time for this to work with getDifficulty(grade, gradeUnit)
              }}
            />
          </div>
          
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