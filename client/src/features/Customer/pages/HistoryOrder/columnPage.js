import "./historyOrder.css";

export const columnTable = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    width: "40%",
    render: (text, record, index) => (
      <div className="order-table-product">
        <a href={`/detail/${record._id}`} className="order-table-img">
          <img
            src={record.images.url}
            alt={record.images.public_id}
            style={{ height: 100, width: 100, objectFit: "scale-down" }}
          />
        </a>
        <div className="order-table-info">
          <a href={`/detail/${record._id}`}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>
              {record.title.toUpperCase()}
            </span>
          </a>
          <div style={{ fontSize: 12 }}>
            <span>Product ID: </span>
            <span>{record.product_id}</span>
          </div>
        </div>
      </div>
    ),
    align: "center",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 200,
    render: (text, record, index) => <span>{record.price} $</span>,
    align: "center",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: 150,
    render: (text, record, index) => <span>{record.quantity}</span>,
    align: "center",
  },
  {
    title: "Sale",
    key: "sale",
    dataIndex: "sale",
    width: 200,
    render: (text, record, index) => <span>{record.sale} %</span>,
    align: "center",
  },
  {
    title: "Provisional",
    key: "provisional",
    render: (text, record, index) =>
      record.sale === 0 ? (
        <span>{record.price * record.quantity} $</span>
      ) : (
        <span>
          {record.price * record.quantity -
            ((record.price * record.quantity * record.sale) / 100).toFixed(
              2
            )}{" "}
          $
        </span>
      ),
    align: "center",
  },
];
