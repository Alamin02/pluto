import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

import { agent } from "../../helpers/agent";
import { columns } from "./addressTableColumnsUserProfile";

export default function Addresses() {
  const token = localStorage.getItem("token");
  const [addressData, setAddressData] = useState([]);

  const fetchOrders = (token) => {
    agent
      .getUserAddress(token)
      .then((res) => res.json())
      .then(({ data }) => {
        setAddressData(data);
      });
  };

  useEffect(() => {
    fetchOrders(token);
  }, [token]);

  return (
    <div>
      {addressData.length === 0 ? (
        <div>
          You currently have no addresses set up.{" "}
          <Link to="/profile/edit">Update your profile</Link>&nbsp;to add new
          shipping addresses.
        </div>
      ) : (
        <Table
          dataSource={addressData}
          size="middle"
          columns={columns}
          bordered
          pagination={false}
        />
      )}
    </div>
  );
}
