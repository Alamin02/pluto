import { Tag } from "antd"
export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (id) => <span>{id}</span>,
  },
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
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
        return <Tag color="green">{offer.name}</Tag>;
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
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },

];