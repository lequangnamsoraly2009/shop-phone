import React from "react";
import "../deviceUser/deviceUser.css";
import { Collapse } from "antd";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

function BrowserUser() {
  const { deviceUser } = useSelector((state) => state.user);

  return (
    <div>
      <div className="infor-header">
        <span>User Device Used</span>
      </div>
      <div className="device-data">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Client Used" key="1">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 700 }}>
                Type:{" "}
                <span
                  style={{ textTransform: "capitalize" ,fontWeight: 500, marginLeft: 10, color: "green" }}
                >
                  {deviceUser.client.type}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Name:{" "}
                <span
                  style={{ fontWeight: 500, marginLeft: 10, color: "green" }}
                >
                  {deviceUser.client.name}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Short Name:{" "}
                <span
                  style={{ fontWeight: 500, marginLeft: 10, color: "green" }}
                >
                  {deviceUser.client.short_name}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Version:{" "}
                <span
                  style={{ fontWeight: 500, marginLeft: 10, color: "green" }}
                >
                  {deviceUser.client.version}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Engine:{" "}
                <span
                  style={{ fontWeight: 500, marginLeft: 10, color: "green" }}
                >
                  {deviceUser.client.engine}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Engine Version:{" "}
                <span
                  style={{ fontWeight: 500, marginLeft: 10, color: "green" }}
                >
                  
                  {deviceUser.client.engine_version ? deviceUser.client.engine_version : "Unknown"}
                </span>
              </span>
              <span style={{ fontWeight: 700 }}>
                Family:{" "}
                <span
                  style={{ fontWeight: 500, marginLeft: 10, color: "green" }}
                >
                  {deviceUser.client.family}
                </span>
              </span>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default BrowserUser;
