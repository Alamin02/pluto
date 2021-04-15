import { Tag } from "antd";

export const columns = [
  {
    title: "Order Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
    render: (id) => <span>{id}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (user) => {
      if (user) {
        return <>{user.name}</>;
      }
    },
  },
  {
    title: "Ordered Product(s)",
    dataIndex: "orderedProducts",
    key: "orderedProducts",
    render: (orderedProducts) => {
      if (orderedProducts) {
        return (
          <>
            {orderedProducts.map((orderedProduct) => (
              <div>
                <Tag color="geekblue">
                  {orderedProduct.product.name}&nbsp;(
                  {orderedProduct.quantity})
                </Tag>
              </div>
            ))}
          </>
        );
      }
    },
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address) => {
      if (address) {
        return <span>{address.address}</span>;
      }
    },
  },
];
