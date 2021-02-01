import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

const optionList = [
    { id: 1, name: "name" },
    { id: 2, name: "position" },
    { id: 3, name: "price" }
]

function OptionSelect(props) {
    return (
        <Select
            showSearch
            style={{ width: 160 }}
            placeholder="Select Option"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
                option.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {optionList.map((option) => {
                return <Option value={option.name} key={option.id} style={{ textTransform: 'uppercase' }}>{option.name}</Option>
            })}
        </Select>
    )

}
export default OptionSelect;



