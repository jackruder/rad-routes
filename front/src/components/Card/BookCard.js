import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuth, apiUrlBase, fetchFromApi } from '../../util';

import Swal from 'sweetalert2';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const defaultAuthorObj = {
  username: "",
  first_name: "",
  last_name: ""
}

export default function Book({ data, deleteThis, loggedIn }) {
  const bookObj = data;
  const navigate = useNavigate();
  const [authorObj, setAuthorObj] = useState(defaultAuthorObj);

  useEffect(() => {
    fetchFromApi(`/users/${data.author}`, setAuthorObj);
  }, [data])

  return (
    !bookObj || Object.keys(bookObj).length > 1 ?
    <Card
      style={{ 
        width: '36rem',
        margin: 10,
        cursor: 'pointer'
      }}
      onClick={() => {
        console.log(bookObj);
        navigate(`/books/${bookObj.book_id}`);
      }}
    >
        <Card.Body style={{ minWidth: '60%', lineHeight: '2rem'}}>
          <Card.Title>{bookObj.book_name}</Card.Title>
          <Card.Text style={{ marginTop: '1rem' }}>{bookObj.book_description}</Card.Text>
          Best Quality: <b>{bookObj.quality_max}</b> <br/>
          <Card.Text>by {authorObj.username}</Card.Text>
          { typeof deleteThis === 'function' && loggedIn ?
          <Button variant="danger"
            onClick={e => {
              e.stopPropagation();
              Swal.fire({
                icon: 'warning',
                title: `Are you sure you want to delete "${bookObj.book_name}"?`,
                text: `Type "${bookObj.book_name}" to confirm.`,
                showCancelButton: true,
                focusCancel: true,
                confirmButtonText: `Delete ${bookObj.book_name}`,
                confirmButtonColor: '#f33',
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                }
              }).then(result => {
                if(result.isConfirmed && result.value === bookObj.book_name){
                  console.log(bookObj);
    
                  const token = getAuth();
                  const headers = token ? {
                      "Authorization": `Token ${token}`
                  } : {};
    
                  fetch(`${apiUrlBase}/books/${bookObj.book_id}`, {
                    method: 'DELETE',
                    headers: headers
                  })
                  .then(res => {
                    if(res.ok){
                      console.log(res.text, bookObj);
        
                      try{
                        Swal.fire({
                          icon: 'success',
                          text: `successfully deleted ${bookObj.book_name}`
                        });
                      }
                      catch(e){
                        console.log(e);
                      }
        
                      deleteThis();
                    }
                    else{
                      throw Error("Could not delete this book. Are you sure you own it?");
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
    </Card> : <>This Book Does Not Exist</>
  )
}