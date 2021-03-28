import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

export default function SearchBar({ productsData }) {
  const [inputValue, setInputValue] = useState(null);

  let productsName = [];

  for (let product of productsData) {
    productsName.push(product.name);
  }

  const productsNameList = productsName.map((name) => (
    <Option key={name}>{name}</Option>
  ));

  const handleSearch = (value) => {
    if (value) {
      setInputValue(value);
    } else {
      setInputValue();
    }
  };

  return (
    <Select
      clearIcon
      showSearch
      value={inputValue}
      placeholder={"Search products"}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      // onChange={this.handleChange}
      notFoundContent={null}
      style={{ width: "300px" }}
    >
      {productsNameList}
    </Select>
  );
}
