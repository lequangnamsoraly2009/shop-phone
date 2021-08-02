import React from "react";
import "./deviceUser.css";
import { Collapse } from "antd";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

function DeviceUser() {
  const { deviceUser } = useSelector((state) => state.user);
  return (
    <div>
      <div className="infor-header">
        <span>User Device Used</span>
      </div>
      <div className="device-data">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Device Used" key="1">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>
                ID:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.device.id}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Type:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.device.type}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Brand:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.device.brand}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Model:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.device.model}
                </span>
              </span>
            </div>
          </Panel>
          <Panel header="Operating System" key="2">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>
                Name:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.os.name}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Short Name:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.os.short_name}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Version:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.os.version}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Platform:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.os.platform}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Family:{" "}
                <span style={{ fontWeight: 500, marginLeft: 10, color: "green" }}>
                  {deviceUser.os.family}
                </span>
              </span>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default DeviceUser;
