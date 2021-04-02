export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
    render: (id) => <span>{id}</span>,
  },
  {
    title: "User Name",
    dataIndex: "user",
    key: "user",
    render: (user) => {
      if (user) {
        return <span>{user.name}</span>;
      }
    },
  },
  {
    title: "User Email",
    dataIndex: "user",
    key: "email",
    render: (user) => {
      if (user) {
        return <span>{user.email}</span>;
      }
    },
  },
  {
    title: "Division",
    dataIndex: "division",
    key: "division",
  },
  {
    title: "District",
    dataIndex: "district",
    key: "district",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "City",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
