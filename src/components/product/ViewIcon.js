import React from 'react';
import {

    BorderOuterOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';

const viewStyle = {
    margin: '0px 5px',
    fontSize: '20px'
}

function ViewIcon() {
    return (
        <div style={{ display: 'inline-block', paddingTop: '5px' }}>
            <BorderOuterOutlined style={viewStyle} />
            <UnorderedListOutlined style={viewStyle} />
        </div>

    )
}
export default ViewIcon;