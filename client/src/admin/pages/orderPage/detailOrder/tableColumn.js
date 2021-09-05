import "./tableColumn.css";

export const columnTable = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    width: "30%",
    render: (text, record, index) => (
      <div className="order-table-product">
        <a href={`/admin/products/${record._id}`} className="order-table-img">
          <img
            src={record.images.url}
            alt={record.images.public_id}
            style={{ height: 100, width: 100, objectFit: "scale-down" }}
          />
        </a>
        <div className="order-table-info">
          <a href={`/admin/products/${record._id}`}>
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
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "center",
    width: 200,
    render: (text, record, index) => <span>{record.price} $</span>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    width: 150,
    render: (text, record, index) => <span>{record.quantity}</span>,
  },
  {
    title: "Pre Price",
    key: "Pre_price",
    align: "center",
    width: 200,
    render: (text, record, index) => (
      <span>{record.price * record.quantity} $</span>
    ),
  },
  {
    title: "Sale",
    key: "sale",
    dataIndex: "sale",
    align: "center",
    width: 200,
    render: (text, record, index) => <span>{record.sale} %</span>,
  },
  {
    title: "Provisional",
    key: "provisional",
    align: "center",
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
  },
];

export const columnDataBuyer = [
  {
    title: "Name Customer",
    dataIndex: "name",
    key: "name",
    render: (text, record, index) => <span>{record.userName}</span>,
  },
  {
    title: "Email Customer",
    dataIndex: "email",
    key: "email",
    align: "center",
    render: (text, record, index) => <span>{record.email}</span>,
  },
  {
    title: "Number Phone",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    render: (text, record, index) => (
      <span>{record.phone === undefined ? "Unknown" : `0${record.phone}`}</span>
    ),
  },
  {
    title: "Total Orders Placed ",
    dataIndex: "total_orders",
    key: "total_orders",
    align: "center",
    render: (text, record, index) => <span>{record.totalPaymentOfUser}</span>,
  },
];

export const columnDataReceiver = [
  {
    title: "Name Customer",
    dataIndex: "name",
    width: "10%",
    key: "name",
    render: (text, record, index) => <span>{record.name}</span>,
  },
  {
    title: "Email Customer",
    dataIndex: "email",
    key: "email",
    width: "10%",

    align: "center",
    render: (text, record, index) => <span>{record.email}</span>,
  },
  {
    title: "Number Phone",
    dataIndex: "phone",
    key: "phone",
    width: "10%",

    align: "center",
    render: (text, record, index) => (
      <span>{record.phone === undefined ? "Unknown" : `0${record.phone}`}</span>
    ),
  },
  {
    title: "Payment Method",
    dataIndex: "method",
    key: "method",
    align: "center",
    width: "10%",
    render: (text, record, index) => (
      <span style={{ textTransform: "upperCase" }}>{record.methodPayment}</span>
    ),
  },
  {
    title: "Notes",
    dataIndex: "notes",
    width: "30%",
    key: "notes",
    align: "center",
    render: (text, record, index) => <span>{record.notes}</span>,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: "30%",
    align: "center",
    render: (text, record, index) => (
      <span>
        {record.address?.ward} - {record.address?.district} - Tỉnh{" "}
        {record.address?.province}
      </span>
    ),
  },
];
