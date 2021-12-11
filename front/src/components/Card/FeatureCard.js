import React from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { getAuth, apiUrlBase } from '../../util';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Feature({ data, onPage, deleteThis, loggedIn }) {
  const featureObj = data;
  const navigate = useNavigate();

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
          {!onPage ? 
            <><Card.Link onClick={() => navigate(`/areas/${featureObj.area}`)}>Area</Card.Link><br/></>
            :
            <></>}
          <Card.Link onClick={() => navigate(`/features/${featureObj.feature_id}`)}>Faces</Card.Link><br/>
          { typeof deleteThis === 'function' && loggedIn ?
          <Button variant="danger"
            onClick={() => {
              Swal.fire({
                icon: 'warning',
                title: `Are you sure you want to delete "${featureObj.feature_name}"?`,
                showCancelButton: true,
                focusCancel: true,
                confirmButtonText: `Delete ${featureObj.feature_name}`,
                confirmButtonColor: '#f33'
              }).then(result => {
                if(result.isConfirmed){
                  console.log(featureObj);
    
                  const token = getAuth();
                  const headers = token ? {
                      "Authorization": `Token ${token}`
                  } : {};
    
                  fetch(`${apiUrlBase}/features/${featureObj.feature_id}`, {
                    method: 'DELETE',
                    headers: headers
                  })
                  .then(res => {
                    if(res.ok){
                      console.log(res.text, featureObj);
        
                      try{
                        Swal.fire({
                          icon: 'success',
                          text: `successfully deleted ${featureObj.feature_name}`
                        });
                      }
                      catch(e){
                        console.log(e);
                      }
        
                      deleteThis();
                    }
                    else{
                      throw Error("Could not delete this feature. Are you sure you own it?");
                    }
                  })
                  .catch(e => {
                    Swal.fire({
                      icon: 'error',
                      text: e
                    })
                  })
                }
              })
            }}
          >
            Delete
          </Button>
          : <></>}
        </Card.Body>
    </Card> : <>This Feature Does Not Exist</>
  )
}