export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
    // pass the userId as "id" to edit button
    render: (id) => <span>{id}</span>,
  },
  {
    title: "Category",
    dataIndex: "name",
    key: "name",
  },
];
