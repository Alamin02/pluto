
import { Tag } from "antd";
export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Featured Product",
    dataIndex: "images",
    key: "images",
    render: (images) => {
      if (!images) {
        return <Tag color="red">Image Not available</Tag>;
      } else {
        return <Tag color="green">Image available</Tag>;
      }
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: () => <Tag color="green">Active</Tag>
  },
];
