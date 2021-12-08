import React from 'react';

import { fetchFromApi } from '../../../util';
import { selectorSize, selectorStyle } from '../../EditPortal';

import Form from 'react-bootstrap/Form';

export default function AreaSelector({ formData, setFormData, editableAreas, setEditableFeatures }){
    return (
        editableAreas ? <>
            { editableAreas.length > 0 ?
            <Form.Group className="mb-3">
                <Form.Label>Area</Form.Label>
                <Form.Select
                    style={selectorStyle}
                    size={selectorSize}
                    onChange={e => {
                        if(formData){
                            let newData = formData;
                            newData.area = e.target.value;
                            setFormData(newData);
                        }
                        
                        if(setEditableFeatures){
                            fetchFromApi(`/areas/${e.target.value}/features`, setEditableFeatures);
                        }
                    }}
                    defaultValue={"default"}
                >
                    <option disabled value="default">-- select area --</option>
                    {editableAreas.map((area, i) => (
                        <option key={i} value={area.area_id}>{area.area_name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            : <>This book doesn't have any areas yet!</>}
        </>
        :
        <></>
    )
}