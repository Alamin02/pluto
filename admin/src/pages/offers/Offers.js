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
import CreateOfferModal from "./CreateOfferModal";
import EditOfferModal from "./EditOfferModal";
import { columns } from "./offerTableColumns";

const deleteMessage = "Sure to delete?";

const { Title } = Typography;

export default function Offers() {
  const [offerData, setOfferData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleEditOffer, setVisibleEditOffer] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

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

  // close createOfferModal when offer created
  const onCreate = (values) => {
    setVisible(false);
  };
  // close editOfferModal after save
  const onEditOffer = () => {
    setVisibleEditOffer(false);
  };

  // edit offer
  const onEdit = (record) => {
    setSelectedOffer(record);
    setVisibleEditOffer(true);
  };

  // delete offer
  function handleDelete(offerId) {
    const token = localStorage.getItem("token");
    agent
      .deleteOffer(token, offerId)
      .then((res) => res.json())
      .then(() => message.info("Successfully deleted"));
  }

  const actionColumn = {
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
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  };

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
          Add offer
        </Button>

        <CreateOfferModal
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />

        <EditOfferModal
          visible={visibleEditOffer}
          onCreate={onEditOffer}
          existingRecord={selectedOffer}
          onCancel={() => {
            setVisibleEditOffer(false);
          }}
        />
        {/* table */}
        <Table
          rowKey={(record) => record.id}
          size="middle"
          dataSource={offerData}
          columns={[...columns, actionColumn]}
          bordered
          sticky
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
