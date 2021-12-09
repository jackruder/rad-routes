import React from 'react';

import { fetchFromApi } from '../../../util';
import { selectorSize, selectorStyle } from '../../EditPortal';

import Form from 'react-bootstrap/Form';

export default function FeatureSelector({ onChange, formData, setFormData, editableFeatures, setEditableFaces }){
    return (
        editableFeatures ? <>
            { editableFeatures.length > 0 ?
            <Form.Group className="mb-3">
                <Form.Label>Feature*</Form.Label>
                <Form.Select
                    style={selectorStyle}
                    size={selectorSize}
                    onChange={e => {
                        if(formData){
                            let newData = formData;
                            newData.feature = e.target.value;
                            setFormData(newData);
                        }
                        
                        if(setEditableFaces){
                            fetchFromApi(`/features/${e.target.value}/faces`, setEditableFaces);
                        }

                        if (typeof onChange === 'function'){
                            onChange();
                        }
                    }}
                    defaultValue={"default"}
                >
                    <option disabled value="default">-- select feature --</option>
                    {editableFeatures.map((feature, i) => (
                        <option key={i} value={feature.feature_id}>{feature.feature_name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            : <>This area doesn't have any features yet!</>}
        </>
        :
        <></>
    )
}