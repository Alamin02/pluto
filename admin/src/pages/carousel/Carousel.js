import React, { useState, useEffect } from "react";
import { Table, Button, Typography, Space, Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { agent } from "../../helpers/agent";
import { columns } from "./carouselTableColumns";
import CreateCarouselModal from "./CreateCarouselModal";

const { Title } = Typography;

export default function Carousel() {
  const [visible, setVisible] = useState(false);
  const [carouselData, setCarouselData] = useState([]);

  const onCreate = () => {
    fetchCarousels();
    setVisible(false);
  };

  function confirmDelete(carouselId) {
    const token = localStorage.getItem("token");

    agent
      .deleteCarousel(token, carouselId)
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          for (let error of res.errors) {
            message.error(error.msg);
          }
        } else {
          message.success("Successfully deleted");
        }
      })
      .then(() => fetchCarousels());
  }

  const fetchCarousels = () => {
    agent
      .getCarousels()
      .then((res) => res.json())
      .then(({ data }) => setCarouselData(data));
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

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
