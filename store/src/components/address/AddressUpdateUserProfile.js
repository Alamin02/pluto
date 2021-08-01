import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

import { getProfile } from "../../client/users.client";
import Section from "../../components/styled-components/Section";
import { columns } from "../../components/address/addressTableColumns";
import CreateNewAddressModal from "../../components/address/CreateNewAddressModal";
import EditAddressModal from "../../components/address/EditAddressModal";
import { getUserAddress } from "../../client/address.client";

export default function AddressUpdateUserProfile() {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [userId, setUserId] = useState("");
  const token = useSelector((state) => state.auth.tokenValue);

  const fetchAddresses = (token) => {
    getUserAddress(token)
      .then((res) => res.json())
      .then(({ data }) => setUserAddress(data));
  };

  const onCreateAddress = () => {
    setVisibleCreateModal(false);
    fetchAddresses(token);
  };

  const onEditAddress = () => {
    fetchAddresses(token);
    setVisibleEditModal(false);
  };

  function onEdit(record) {
    setVisibleEditModal(true);
    setSelectedAddress(record);
  }

  useEffect(() => {
    fetchAddresses(token);
  }, [token]);

  useEffect(() => {
    if (token)
      getProfile(token)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            setUserId(data.id);
          }
        });
  }, [token]);

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (id, record) => (
      <Button
        icon={<EditOutlined />}
        onClick={() => {
          onEdit(record);
        }}
      >
        Edit
      </Button>
    ),
  };

  return (
    <Section heading="Update shipping address">
      {!userAddress || userAddress.length === 0 ? (
        <div>You currently have no shipping addresses.</div>
      ) : (
        <Table
          dataSource={userAddress}
          size="middle"
          columns={[...columns, actionColumn]}
          bordered
          pagination={false}
        />
      )}

      <br />

      <Button
        type="primary"
        style={{ textTransform: "capitalize" }}
        icon={<PlusOutlined />}
        onClick={() => {
          setVisibleCreateModal(true);
        }}
      >
        add new address
      </Button>

      <CreateNewAddressModal
        visible={visibleCreateModal}
        onCreate={onCreateAddress}
        onCancel={() => {
          setVisibleCreateModal(false);
        }}
        userId={userId}
      />

      <EditAddressModal
        visible={visibleEditModal}
        onCreate={onEditAddress}
        currentAddress={selectedAddress}
        onCancel={() => {
          setVisibleEditModal(false);
        }}
      />
    </Section>
  );
}
