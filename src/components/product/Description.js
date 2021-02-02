import React from 'react';

const Description = ({ name }) => {
    return (
        <div style={{ display: 'inline-block', fontSize: '20px', marginRight: '6px' }}>
            <label htmlFor={name}>{name}</label>
        </div>
    );
};
export default Description;

