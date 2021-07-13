import {
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  UpCircleOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { BackTop } from "antd";
import { Footer } from "antd/lib/layout/layout";
import React from "react";
import "./footer.css";

function FooterNav() {
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };
  return (
    <Footer>
      <div className="container-fluid">
        <div className="footer">
          <div className="logo">
            <a href="/">SORALY</a>
          </div>
          <ul className="socials" >
            <li>
              <a href="/">
                <GoogleOutlined />
              </a>
            </li>
            <li>
              <a href="/">
                <LinkedinOutlined />
              </a>
            </li>
            <li>
              <a href="/">
                <TwitterOutlined />
              </a>
            </li>
            <li>
              <a href="/">
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a href="/">
                <GithubOutlined />
              </a>
            </li>
            <li>
              <a href="/">
                <YoutubeOutlined />
              </a>
            </li>
          </ul>
          <div className="copyright">Copyright &copy; 2021 Soraly</div>
          <BackTop>
            <div style={style}>
              <UpCircleOutlined style={{ width: 30, height: 30 }} />
            </div>
          </BackTop>
        </div>
      </div>
    </Footer>
  );
}

export default FooterNav;
