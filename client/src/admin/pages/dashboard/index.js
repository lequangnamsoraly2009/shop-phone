import { Breadcrumb, Col } from "antd";
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

  console.log({ operatingSystem: operatingSystem });
  console.log({ client: client });
  console.log({ device: device });

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
      } else if (item?.name === "Linux") {
        linux += 1;
      } else {
        diff += 1;
      }
    });
    return [and, ios, win, mac, linux, diff];
  };

  console.log(dataOs());

  const dataPie = {
    labels: ["Android", "iOS", "Windows", "MacOs", "Linux", "Different"],
    datasets: [
      {
        label: "Dataset OS (%)",
        data: dataOs(),
        backgroundColor: ["red", "green", "purple", "blue", "black", "yellow"],
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
        <div>
          <Pie
            data={dataPie}
            width={300}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </Col>
  );
}

export default DashBoard;
