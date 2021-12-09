import React, { useEffect, useState } from 'react';

import { fetchFromApi } from '../../util';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BookCard from '../Card/BookCard';

export default function BookList({ loggedIn }){
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        fetchFromApi("books/", setBookList);
    }, []);

    return (
        bookList.length > 0 ?
        <Row xs={1} md={2} lg={3} style={{ width: '100%' }}>
            {bookList.map((book, idx) => (
                <Col
                    key={idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <BookCard data={book}/>
                </Col>
            ))}
        </Row>
        :
        (
            loggedIn ?
            <div style={{textAlign: 'center'}}>No Books Available</div>
            :
            <div style={{textAlign: 'center'}}>Log in to see available books</div>
        )
    )
}