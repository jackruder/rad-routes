import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Book from './Book';

import { getAuth, apiUrlBase } from './AreaList';

export default function Area({ data }) {
  const areaObj = data;

  const [thisBook, setThisBook] = useState(null);

  useEffect(() => {
    const token = getAuth();
    const headers = token ? {
        "Authorization": `Token ${token}`
    } : null;
    fetch(`${apiUrlBase}/books/${areaObj.book_id}`, {
        method: 'GET',
        headers: headers
    })
    .then(res => res.json())
    .then(d => setThisBook(<Book data={d}/>))
    .catch(e => console.log(e));
}, []);

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
          <details>
              <summary>Book</summary>
              {thisBook}
          </details>
          <Card.Link>Features</Card.Link><br/>
        </Card.Body>
    </Card> : <>This Climb Does Not Exist</>
  )
}