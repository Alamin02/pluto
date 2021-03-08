import { Space, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { agent } from "../../helpers/agent";
const deleteMessage = "Sure to delete?";
// delete button message
let visible = false;

const onCreate = (values) => {
  console.log("Received values of form: ", values);
  visible = false;
};

function confirmDelete() {
  message.info("Clicked on Yes.");
}
 export function onEdit() {
  visible = true;
  console.log("edit clicked");
}
function onDelete(offerId) {
  // console.log("delte clicked");
  const token = localStorage.getItem("token");
  agent
    .deleteOffer(token, offerId)
    .then((res) => res.json())
    .then(console.log);
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
        <Button icon={<EditOutlined />} onClick={() => onEdit()}>
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
