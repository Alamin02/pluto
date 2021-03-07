import { Space, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const deleteMessage = "Sure to delete?";

// delete button message
function confirmDelete() {
  message.info("Clicked on Yes.");
}

export const Columns = [
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
        <Button icon={<EditOutlined />}>Edit</Button>
        <Popconfirm
          placement="top"
          title={deleteMessage}
          onConfirm={confirmDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
