import React from 'react';
const descriptionStyle = {
    display: 'inline-block',
    fontSize: '20px',
    marginRight: '6px'
}
const Description = ({ name }) => {
    return (
        <div style={descriptionStyle}>
            <label htmlFor={name}>{name}</label>
        </div>
    );
};
export default Description;

