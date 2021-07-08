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
import { getOffers, deleteOffer } from "../../client/offers.client";
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

  const fetchOffers = () => {
    getOffers()
      .then((res) => res.json())
      .then(({ data }) => {
        setOfferData(data.offers);
        if (selectedOffer)
          setSelectedOffer(
            data.offers.find((offer) => offer.id === selectedOffer.id)
          );
      });
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // close createOfferModal when offer created
  const handleCreateOfferModal = (values) => {
    setVisible(false);
    fetchOffers();
  };

  // close editOfferModal after save
  const handleEditOfferModal = () => {
    fetchOffers();
    setVisibleEditOffer(false);
  };

  // edit offer
  const handleEdit = (record) => {
    setSelectedOffer(record);
    setVisibleEditOffer(true);
  };

  // delete offer
  function handleDelete(offerId) {
    const token = localStorage.getItem("token");
    deleteOffer(token, offerId)
      .then((res) => res.json())
      .then(({ success, message: msg, error }) => {
        if (success) {
          message.success(msg);
        } else {
          message.error(error);
        }
      })
      .then(() => fetchOffers());
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
            handleEdit(record);
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
          onCreate={handleCreateOfferModal}
          onCancel={() => {
            setVisible(false);
          }}
          refetch={fetchOffers}
        />

        <EditOfferModal
          visible={visibleEditOffer}
          onCreate={handleEditOfferModal}
          existingRecord={selectedOffer}
          onCancel={() => {
            setVisibleEditOffer(false);
          }}
          refetch={fetchOffers}
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
