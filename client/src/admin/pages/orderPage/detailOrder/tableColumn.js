import { Button, Space } from "antd";
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
          {Math.floor(
            record.price * record.quantity -
              (record.price * record.quantity * record.sale) / 100
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
    render: (text, record, index) => <span>{record.name}</span>,
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
    render: (text, record, index) => <span>{record.numberOrderUser}</span>,
  },
];

export const columnDataReceiver = [
  {
    title: "Name Customer",
    dataIndex: "name",
    key: "name",
    render: (text, record, index) => <span>{record.name}</span>,
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
    title: "Payment Method",
    dataIndex: "method",
    key: "method",
    align: "center",
    render: (text, record, index) => <span>{record.numberOrderUser}</span>,
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
    render: (text, record, index) => <span>{record.address?.line1}</span>,
  },
];

export const columnPayment = [
  {
    title: "Total Price",
    dataIndex: "total_price",
    key: "total_price",
    render: (text, record, index) => (
      <span>
        {record.cart?.reduce((item1, item2) => {
          return item1 + item2.price * item2.quantity;
        }, 0)}
        $
      </span>
    ),
  },
  {
    title: "Price Sale",
    dataIndex: "price_sale",
    key: "price_sale",
    align: "center",
    render: (text, record, index) => (
      <span>
        {record.cart?.reduce((item1, item2) => {
          return (
            item1 +
            Math.round((item2.price * item2.quantity * item2.sale) / 100)
          );
        }, 0)}
        $
      </span>
    ),
  },
  {
    title: "Transport Fee",
    dataIndex: "fee",
    key: "fee",
    align: "center",
    render: (text, record, index) => <span>{10}$</span>,
  },
  {
    title: "Total Price To Pay",
    dataIndex: "price_pay",
    key: "price_pay",
    align: "center",
    render: (text, record, index) => (
      <span>
        {record.cart?.reduce((item1, item2) => {
          return (
            item1 +
            Math.round(
              item2.price * item2.quantity -
                (item2.price * item2.quantity * item2.sale) / 100
            )
          );
        }, 10)}
        $
      </span>
    ),
  },
  {
    title: "Print Invoice",
    key: "print_invoice",
    align: "center",
    render: (text, record, index) => <Button type="link">Print PDF</Button>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (text, record, index) => <span>{record.status}</span>,
  },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    render: (text, record, index) => (
      <Space size="middle">
        <Button type="primary">Accept and Delivery</Button>
        <Button type="danger">Cancel</Button>
      </Space>
    ),
  },
];
