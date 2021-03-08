import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Typography,
  Row,
  Col,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { agent } from "../../helpers/agent";
// import { Columns } from "./Columns";
import OfferForm from "./OfferForm";
import EditOfferForm from "./EditOfferForm";

const deleteMessage = "Sure to delete?";

function confirmDelete() {
  message.info("Clicked on Yes.");
}

function onDelete(offerId) {
  // console.log("delte clicked");
  const token = localStorage.getItem("token");
  agent
    .deleteOffer(token, offerId)
    .then((res) => res.json())
    .then(console.log);
}
const { Title } = Typography;
export default function Offers() {
  const [visible, setVisible] = useState(false);
  const [visibleEditOffer, setVisibleEditOffer] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };
  const onEditOffer = () => {
    // console.log("Received values of editForm: ", values);
    setVisibleEditOffer(false);
  };
  let records = {
    id: "",
    name: "",
    discount: 0,
    description: "",
  };

  const onEdit = (record) => {
    // records = record;
    records.id = record.id;
    records.name = record.name;
    records.discount = record.discount;
    records.description = record.description;
    console.log(records);
    setVisibleEditOffer(true);
  };
  const [offerData, setOfferData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/api/v1/offers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setOfferData(data);
      });
  }, []);

  const Columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Offer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (id, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              onEdit(record);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title={deleteMessage}
            onConfirm={confirmDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="middle">
        <Button
          type="primary"
          style={{ textTransform: "capitalize" }}
          icon={<PlusOutlined />}
          onClick={() => {
            setVisible(true);
          }}
        >
          add offer
        </Button>

        <OfferForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <EditOfferForm
          visible={visibleEditOffer}
          onCreate={onEditOffer}
          editInitialData={records}
          onCancel={() => {
            setVisibleEditOffer(false);
          }}
        />
        {/* table */}
        <Table
          rowKey={(record) => record.id}
          size="middle"
          dataSource={offerData}
          columns={Columns}
          bordered
          sticky
          // scroll={{ x: 1330 }}
          // pagination={{ pageSize: 10 }}
          pagination={false}
          title={() => (
            <Row justify="space-between">
              <Col>
                <Title
                  level={4}
                  style={{ marginBottom: 0, textTransform: "capitalize" }}
                >
                  All offers info
                </Title>
              </Col>
              <Col></Col>
            </Row>
          )}
        />
      </Space>
    </div>
  );
}
