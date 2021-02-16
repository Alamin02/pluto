import React from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;

const SearchOption = () => {
    const onSearch = value => console.log(value);
    return (
        <Space direction="vertical">
            <Search placeholder="search option" onSearch={onSearch} style={{ width: 300 }} allowClear />
        </Space>)
}
export default SearchOption;

