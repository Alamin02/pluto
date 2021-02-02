import React from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;
const onSearch = value => console.log(value);

const SearchOption = () => {
    return (
        <Space direction="vertical">
            <Search placeholder="search option" onSearch={onSearch} style={{ width: 200 }} allowClear />
        </Space>)
}
export default SearchOption;

