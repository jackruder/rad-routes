import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function UnitDropdown(props){
    const {label, unitList} = props;

    return (
        <Dropdown
            onSelect={props.onSelect}
            style={{
                display: 'inline',
                marginLeft: props.marginLeft
            }}
        >
            <Dropdown.Toggle variant="light" id="unit-dropdown">
                {label}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="light">
                {unitList.map((u, i) => (
                    <Dropdown.Item key={i} eventKey={u.varName}>{u.name}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}