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
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Product Id",
    dataIndex: "productId",
    key: "productId",
    ellipsis: true,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",

    render: (image) => {
      if (!image) {
        return <Tag color="red">Image Not available</Tag>;
      } else {
        return <Tag color="green">Image available</Tag>;
      }
    },
  },
];
