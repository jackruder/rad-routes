import React from "react";

import { fetchFromApi } from "../../../util";
import { selectorSize, selectorStyle } from "../../EditPortal";

import Form from 'react-bootstrap/Form';

export default function BookSelector({ onChange, formData, setFormData, editableBooks, setEditableAreas }){
    return (
        <Form.Group className="mb-3">
            <Form.Label>Book*</Form.Label>
            <Form.Select
                style={selectorStyle}
                size={selectorSize}
                onChange={e => {
                    if(formData){
                        let newData = formData;
                        newData.book = e.target.value;
                        setFormData(newData);
                    }

                    if(setEditableAreas){
                        fetchFromApi(`/books/${e.target.value}/areas`, setEditableAreas);
                    }

                    if (typeof onChange === 'function'){
                        onChange();
                    }
                }}
                defaultValue={"default"}
            >
                <option disabled value="default">-- select book --</option>
                {editableBooks.map((book, i) => (
                    <option key={i} value={book.book_id}>{book.book_name}</option>
                ))}
            </Form.Select>
        </Form.Group>
    )
}