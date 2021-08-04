import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import "../page.css";
import "./dashboard.css";
import { HomeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Pie, Line, Bar } from "react-chartjs-2";
import CardTotal from "./components/cardTotal";
import { MonthsOfYear } from "../../utils/month";

function DashBoard() {
  const { payments } = useSelector((state) => state.payments);
  const {
    operatingSystem,
    client,
    device,
    numberPaymentFilterMonth,
    dataPaymentFilterMonth,
  } = useSelector((state) => state.dashboards);

  const [pricePaymentMonths, setPricePaymentMonths] = useState([]);
  const [totalPriceYears, setTotalPriceYears] = useState([]);

  useEffect(() => {
    const totalPriceMonth = [];
    dataPaymentFilterMonth.forEach((item) => {
      totalPriceMonth.push(
        item?.reduce((payment1, payment2) => {
          return (
            payment1 +
            payment2.cart.reduce((item1, item2) => {
              return (
                item1 +
                (item2.price * item2.quantity -
                  Math.round((item2.price * item2.quantity * item2.sale) / 100))
              );
            }, 0)
          );
        }, 0)
      );
    });
    const totalPrice = payments.reduce((payment1, payment2) => {
      return (
        payment1 +
        payment2.cart.reduce((item1, item2) => {
          return (
            item1 +
            (item2.price * item2.quantity -
              Math.round((item2.price * item2.quantity * item2.sale) / 100))
          );
        }, 0)
      );
    }, 0);
    setTotalPriceYears(totalPrice);
    setPricePaymentMonths(totalPriceMonth);
  }, [dataPaymentFilterMonth, payments]);

  const dataOs = () => {
    let and = 0;
    let ios = 0;
    let linux = 0;
    let win = 0;
    let mac = 0;
    let diff = 0;
    operatingSystem.forEach((item) => {
      if (item?.name === "Mac") {
        mac += 1;
      } else if (item?.name === "Windows") {
        win += 1;
      } else if (item?.name === "Android") {
        and += 1;
      } else if (item?.name === "iOS") {
        ios += 1;
      } else if (item?.name === "GNU/Linux") {
        linux += 1;
      } else {
        diff += 1;
      }
    });
    return [and, ios, win, mac, linux, diff];
  };

  const dataDevice = () => {
    let desktop = 0;
    let smartphone = 0;
    let diff = 0;
    device.forEach((item) => {
      if (item?.type === "desktop") {
        desktop += 1;
      } else if (item?.type === "smartphone") {
        smartphone += 1;
      } else {
        diff += 1;
      }
    });
    return [desktop, smartphone, diff];
  };

  const dataBrowser = () => {
    let chrome = 0;
    let chrome_mb = 0;
    let ie = 0;
    let safari = 0;
    let diff = 0;

    client.forEach((item) => {
      if (item?.name === "Chrome") {
        chrome += 1;
      } else if (item?.name === "Chrome Mobile") {
        chrome_mb += 1;
      } else if (item?.name === "Internet Explorer") {
        ie += 1;
      } else if (item?.name === "Mobile Safari") {
        safari += 1;
      } else {
        diff += 1;
      }
    });
    return [chrome, chrome_mb, ie, safari, diff];
  };
  const dataPieOs = {
    labels: ["Android", "iOS", "Windows", "MacOs", "Linux", "Different"],
    datasets: [
      {
        label: "Dataset OS (%)",
        data: dataOs(),
        backgroundColor: [
          "tomato",
          "paleturquoise",
          "purple",
          "pink",
          "dimgray",
          "teal",
        ],
      },
    ],
  };

  const dataPieBrowser = {
    labels: [
      "Chrome",
      "Chrome Mobile",
      "Internet Explorer",
      "Mobile Safari",
      "Different",
    ],
    datasets: [
      {
        label: "Dataset Browser (%)",
        data: dataBrowser(),
        backgroundColor: ["tomato", "paleturquoise", "purple", "pink", "teal"],
      },
    ],
  };

  const dataPieDevice = {
    labels: ["Desktop", "Smartphone", "Different"],
    datasets: [
      {
        label: "Dataset Device (%)",
        data: dataDevice(),
        backgroundColor: ["tomato", "paleturquoise", "teal"],
      },
    ],
  };

  const numberPaymentMonths = {
    labels: MonthsOfYear,
    datasets: [
      {
        label: "Number Payments Of This Month",
        data: numberPaymentFilterMonth,
        backgroundColor: [
          "tomato",
          "paleturquoise",
          "purple",
          "pink",
          "teal",
          "black",
          "gray",
          "yellow",
          "orange",
          "green",
          "acid green",
          "blond",
        ],
      },
    ],
  };

  const dataPaymentMonths = {
    labels: MonthsOfYear,
    datasets: [
      {
        label: "Total Price Of This Month ($)",
        data: pricePaymentMonths,
        backgroundColor: [
          "tomato",
          "paleturquoise",
          "purple",
          "pink",
          "teal",
          "black",
          "gray",
          "yellow",
          "orange",
          "green",
          "acid green",
          "blond",
        ],
      },
    ],
  };

  return (
    <Col className="gutter-row" span={21}>
      <div>
        <div className="header_page">
          <h3>Home</h3>
        </div>
        <div className="home_breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item href="">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="chart-dashboard">
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div className="chart-os">
                <span>Number Registration OS</span>
                <Pie
                  data={dataPieOs}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="chart-os">
                <span>Number Registration Browser</span>
                <Pie
                  data={dataPieBrowser}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="chart-os">
                <span>Number Registration Device</span>
                <Pie
                  data={dataPieDevice}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="chart-card-list">
          <span>Some parameters of the website</span>
          <CardTotal />
        </div>
        <div className="chart-data-payments">
          <span>Summary of monthly orders</span>
          <div className="chart-data-month">
            <Line
              data={numberPaymentMonths}
              options={{ maintainAspectRatio: false }}
              height={300}
            />
          </div>
        </div>
        <div className="chart-data-payments">
          <span>Total sales per month</span>
          <div className="chart-data-month">
            <Bar
              data={dataPaymentMonths}
              options={{ maintainAspectRatio: false }}
              height={300}
            />
          </div>
        </div>
      </div>
    </Col>
  );
}

export default DashBoard;
