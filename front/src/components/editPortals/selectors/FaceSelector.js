import React from 'react';

import { selectorSize, selectorStyle } from '../../EditPortal';

import Form from 'react-bootstrap/Form';

export default function AreaSelector({ formData, setFormData, editableFaces }){
    return (
        editableFaces ? <>
            { editableFaces.length > 0 ?
            <Form.Group className="mb-3">
                <Form.Label>Face</Form.Label>
                <Form.Select
                    style={selectorStyle}
                    size={selectorSize}
                    onChange={e => {
                        if(formData){
                            let newData = formData;
                            newData.face = e.target.value;
                            setFormData(newData);
                        }
                    }}
                    defaultValue={"default"}
                >
                    <option disabled value="default">-- select face --</option>
                    {editableFaces.map((face, i) => (
                        <option key={i} value={face.face_id}>{face.face_name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            : <>This feature doesn't have any faces yet!</>}
        </>
        :
        <></>
    )
}