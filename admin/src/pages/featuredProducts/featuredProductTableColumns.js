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
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: "50",
  },
  {
    title: "Offer",
    dataIndex: "offer",
    key: "offer",
    render: (offer) => {
      if (offer) {
        return <Tag color="green">{offer.name}</Tag>;
      }
    },
  },
  {
    title: "Images",
    dataIndex: "images",
    key: "images",
    render: (images) => {
      if (!images.length) {
        return <Tag color="red">Image Not available</Tag>;
      } else {
        return <Tag color="green">Image count {images.length}</Tag>;
      }
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category) => {
      if (category) {
        return <Tag color="volcano">{category.name}</Tag>;
      }
    },
  },
  {
    title: "Summary",
    dataIndex: "summary",
    key: "summary",
    ellipsis: true,
  },
];
