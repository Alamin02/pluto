import React from 'react';
import { Pagination } from 'antd';

const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '50px'
}

function PageInfo() {
    return (
        <div>
            <Pagination defaultCurrent={1} total={50} style={pageStyle} />
        </div>
    )
}

export default PageInfo;
