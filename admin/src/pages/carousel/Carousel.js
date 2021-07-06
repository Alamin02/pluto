import React, { useState, useEffect } from "react";
import { Table, Button, Typography, Space, Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { getCarousels, deleteCarousel } from "../../client/carousels.cient";
import { columns } from "./carouselTableColumns";
import CreateCarouselModal from "./CreateCarouselModal";

const { Title } = Typography;

export default function Carousel() {
  const [visible, setVisible] = useState(false);
  const [carouselData, setCarouselData] = useState([]);

  const fetchCarousels = () => {
    getCarousels()
      .then((res) => res.json())
      .then(({ data }) => setCarouselData(data));
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  const onCreate = () => {
    fetchCarousels();
    setVisible(false);
  };

  function confirmDelete(carouselId) {
    const token = localStorage.getItem("token");

    deleteCarousel(token, carouselId)
      .then((res) => res.json())
      .then((res) => {
        const { success, error } = res;
        if (success) {
          message.success(res.message);
        } else {
          message.error(error);
        }
      })
      .then(() => fetchCarousels());
  }

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (record) => (
      <Popconfirm
        placement="top"
        title={"Sure to delete?"}
        onConfirm={() => confirmDelete(record.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button danger icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Popconfirm>
    ),
  };

  return (
    <Space direction="vertical">
      <Button
        type="primary"
        style={{ textTransform: "capitalize" }}
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
        }}
      >
        add carousel
      </Button>

      <CreateCarouselModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <Table
        rowKey={(record) => record.id}
        dataSource={carouselData}
        columns={[...columns, actionColumn]}
        bordered
        pagination={false}
        title={() => (
          <Title
            level={4}
            style={{ marginBottom: 0, textTransform: "capitalize" }}
          >
            Carousels info
          </Title>
        )}
      />
    </Space>
  );
}
