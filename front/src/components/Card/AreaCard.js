import React from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { getAuth, apiUrlBase } from '../../util';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function AreaCard({ data, onPage, deleteThis, loggedIn }) {
  const areaObj = data;
  const navigate = useNavigate();

  return (
    Object.keys(areaObj).length > 1 ?
    <Card
      style={{ width: '36rem', margin: 10 }}
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
          <Card.Link onClick={() => navigate(`/areas/${areaObj.area_id}`)}>Features</Card.Link><br/>
          { typeof deleteThis === 'function' && loggedIn ?
          <Button variant="danger"
            onClick={() => {
              Swal.fire({
                icon: 'warning',
                title: `Are you sure you want to delete "${areaObj.area_name}"?`,
                showCancelButton: true,
                focusCancel: true,
                confirmButtonText: `Delete ${areaObj.area_name}`,
                confirmButtonColor: '#f33'
              }).then(result => {
                if(result.isConfirmed){
                  console.log(areaObj);
    
                  const token = getAuth();
                  const headers = token ? {
                      "Authorization": `Token ${token}`
                  } : {};
    
                  fetch(`${apiUrlBase}/areas/${areaObj.area_id}`, {
                    method: 'DELETE',
                    headers: headers
                  })
                  .then(res => {
                    if(res.ok){
                      console.log(res.text, areaObj);
        
                      try{
                        Swal.fire({
                          icon: 'success',
                          text: `successfully deleted ${areaObj.area_name}`
                        });
                      }
                      catch(e){
                        console.log(e);
                      }
        
                      deleteThis();
                    }
                    else{
                      throw Error("Could not delete this area. Are you sure you own it?");
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
    </Card> : <>This Area Does Not Exist</>
  )
}