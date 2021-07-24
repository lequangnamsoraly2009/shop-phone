export const columnTable = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    width: "40%",
    render: (text, record, index) => <a href="/">{record.title}</a>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 200,
    render: (text, record, index) => <span>{record.price} $</span>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: 150,
    render: (text, record, index) => <span>{record.quantity}</span>,
  },
  {
    title: "Sale",
    key: "sale",
    dataIndex: "sale",
    width: 200,
    render: (text, record, index) => <span>{record.sale}</span>,
  },
  {
    title: "Provisional",
    key: "provisional",
    render: (text, record, index) =>
      record.sale === 0 ? (
        <span>{record.price * record.quantity}</span>
      ) : (
        <span>
          {Math.floor(
            record.price * record.quantity -
              (record.price * record.quantity * record.sale) / 100
          )}
        </span>
      ),
  },
];
