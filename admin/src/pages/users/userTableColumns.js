import { Tag } from "antd";

export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
    render: (id) => <span>{id}</span>,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "User Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Addresses",
    dataIndex: "addresses",
    key: "addresses",
    render: (addresses) => {
      if (addresses.length) {
        return <span>{addresses[0].address}</span>;
      } else {
        return <Tag color="lime">Empty</Tag>;
      }
    },
  },
];
