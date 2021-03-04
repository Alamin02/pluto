import { Table, Tag, Space, Button, Popconfirm, message } from "antd";

import sampleProductData from "../assets/data/sampleProductData";

const deleteMessage = "Sure to delete?";

function confirmDelete() {
  message.info("Clicked on Yes.");
}

const columns = [
  {
    title: "Product Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Offer",
    dataIndex: "offer",
    key: "offer",
    render: (offer) => {
      if (offer) {
        return <Tag color="green">{offer}</Tag>;
      }
    },
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category) => <Tag color="geekblue">{category.toUpperCase()}</Tag>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (text, record) => (
      <Space size="middle">
        <Button>Update</Button>
        <Popconfirm
          placement="top"
          title={deleteMessage}
          onConfirm={confirmDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button>Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const loadingState = false;

export default function Products() {
  return (
    <div>
      <Space direction="vertical" size="middle">
        <Button type="primary" style={{ textTransform: "capitalize" }}>
          add product
        </Button>
        {/* table */}
        <Table
          size="middle"
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
          }}
          loading={loadingState}
          dataSource={sampleProductData}
          columns={columns}
          bordered
          title={() => "Products Info"}
          footer={() => "Footer"}
        />
      </Space>
    </div>
  );
}
