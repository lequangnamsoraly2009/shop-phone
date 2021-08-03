import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import "../page.css";
import "./dashboard.css";
import { HomeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";

function DashBoard() {
  const { deviceUsers } = useSelector((state) => state.usersAdmin);
  const [operatingSystem, setOperatingSystem] = useState([]);
  const [client, setClient] = useState([]);
  const [device, setDevice] = useState([]);

  useEffect(() => {
    let oSys = [];
    let cli = [];
    let device = [];
    deviceUsers.forEach((user) => {
      oSys.push(user.resultDevice?.os);
      cli.push(user.resultDevice?.client);
      device.push(user.resultDevice?.device);
    });
    setOperatingSystem(oSys);
    setClient(cli);
    setDevice(device);
  }, [deviceUsers]);

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
        backgroundColor: ["tomato", "paleturquoise", "purple", "pink", "dimgray", "teal"],
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
      </div>
    </Col>
  );
}

export default DashBoard;
