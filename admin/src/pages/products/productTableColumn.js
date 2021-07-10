import { Tag, Tooltip, message } from "antd";

const tooltipText = <span>Click to copy product Id</span>;

const copySuccessfulMessage = () => {
  message.success("Product id has been copied to the clipboard", 5);
};

export const columns = [
  {
    title: "Id (Click to copy Id)",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
    render: (id) => (
      <Tooltip placement="topLeft" title={tooltipText}>
        <span
          onClick={() => {
            navigator.clipboard.writeText(id).then(copySuccessfulMessage());
          }}
        >
          {id}
        </span>
      </Tooltip>
    ),
  },
  {
    title: "Product Added",
    dataIndex: "createdAt",
    key: "createdAt",
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
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
  },
];
