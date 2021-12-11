import React from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { getAuth, apiUrlBase } from '../../util';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Feature({ data, onPage, deleteThis, loggedIn }) {
  const faceObj = data;
  const navigate = useNavigate();

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
          {!onPage ? <>
            <Card.Link onClick={() => navigate(`/features/${faceObj.feature}`)}>Feature</Card.Link><br/>
          </>
          : <></>}
          <Card.Link onClick={() => navigate(`/faces/${faceObj.face_id}`)}>Climbs</Card.Link><br/>
          { typeof deleteThis === 'function' && loggedIn ?
          <Button variant="danger"
            onClick={() => {
              Swal.fire({
                icon: 'warning',
                title: `Are you sure you want to delete "${faceObj.face_name}"?`,
                showCancelButton: true,
                focusCancel: true,
                confirmButtonText: `Delete ${faceObj.face_name}`,
                confirmButtonColor: '#f33'
              }).then(result => {
                if(result.isConfirmed){
                  console.log(faceObj);
    
                  const token = getAuth();
                  const headers = token ? {
                      "Authorization": `Token ${token}`
                  } : {};
    
                  fetch(`${apiUrlBase}/faces/${faceObj.face_id}`, {
                    method: 'DELETE',
                    headers: headers
                  })
                  .then(res => {
                    if(res.ok){
                      console.log(res.text, faceObj);
        
                      try{
                        Swal.fire({
                          icon: 'success',
                          text: `successfully deleted ${faceObj.face_name}`
                        });
                      }
                      catch(e){
                        console.log(e);
                      }
        
                      deleteThis();
                    }
                    else{
                      throw Error("Could not delete this face. Are you sure you own it?");
                    }
                  })
                  .catch(e => {
                    Swal.fire({
                      icon: 'error',
                      text: e
                    })
                  })                  
                }
              });
            }}
          >
            Delete
          </Button>
          : <></>}
        </Card.Body>
    </Card> : <>This Face Does Not Exist</>
  )
}