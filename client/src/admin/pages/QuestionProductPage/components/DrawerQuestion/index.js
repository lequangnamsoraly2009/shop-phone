import {
  BookOutlined,
  CarOutlined,
  IdcardOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PendingQuestionProductAPI from "../../../../../api/pendingQuestionProductAPI";
import Swal from "sweetalert2";
import "./drawerQuestion.css";

const DescriptionItem = ({ title, content }) => (
  <div className="drawer_question-des" style={{ textTransform: "capitalize" }}>
    <p className="drawer_question-des-label">{title}:</p>
    {content}
  </div>
);

function DrawerQuestion({ visibleDrawer, setVisibleDrawer, record }) {
  const { products } = useSelector((state) => state.productsFilter);
  const [productQuestion, setProductQuestion] = useState({});
  const { token } = useSelector((state) => state.token);
  const [visibleDrawerChild, setVisibleDrawerChild] = useState(false);

  useEffect(() => {
    let pQuestion = {};
    products.forEach((product) => {
      if (product._id === record.product_id) {
        pQuestion = product;
      }
    });
    setProductQuestion(pQuestion);
  }, [products, record.product_id]);

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const showDrawerChild = () => {
    setVisibleDrawerChild(true);
  };

  const handleOnCloseDrawerChild = () => {
    setVisibleDrawerChild(false);
  };

  const onConfirmPendingQuestion = async (values) => {
    try {
      const { replyQuestion } = values;

      const objectReplyQuestion = {
        message: replyQuestion,
        userReply: "Admin",
      };

      await PendingQuestionProductAPI.confirmPendingQuestionProduct({
        question_id: record._id,
        replyQuestion: objectReplyQuestion,
        questionCreatedAt: record.createdAt,
        token,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Confirm And Reply Question Success!",
        showConfirmButton: false,
        timer: 2000,
      });
      setVisibleDrawerChild(false);
      setVisibleDrawer(false);

      window.location.reload();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleRejectPendingQuestion = async (_id) => {
    try {
      await PendingQuestionProductAPI.deletePendingQuestionProduct({
        _id,
        token,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Pending Question Success !",
        showConfirmButton: false,
        timer: 2000,
      });
      setVisibleDrawerChild(false);
      setVisibleDrawer(false);

      window.location.reload();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong !",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <Drawer
        title="Description Detail Question For Product"
        width={640}
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
      >
        <p className="drawer_question-header">
          <IdcardOutlined style={{ marginRight: 10 }} />
          Information User
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="User Name" content={record.userName} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Account"
              content="Se duoc Update Them sau"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Country" content="Việt Nam " />
          </Col>
        </Row>
        <p className="drawer_question-header">
          <CarOutlined style={{ marginRight: 10 }} />
          Information Product
        </p>
        <Row style={{ margin: "20px 0" }}>
          <Col style={{ display: "flex" }} span={24}>
            <img
              style={{ height: 150, margin: "0 auto" }}
              src={productQuestion.images?.url}
              alt="Product Question"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Product Name"
              content={productQuestion.title}
            />
          </Col>
          <Col span={12}>
            <div
              className="drawer_question-des"
              style={{ textTransform: "capitalize" }}
            >
              <p className="drawer_question-des-label">Price :</p>
              {productQuestion.price} $
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Storage"
              content={productQuestion.storage}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Status" content={productQuestion.status} />
          </Col>
        </Row>
        <p className="drawer_question-header">
          <BookOutlined style={{ marginRight: 10 }} />
          Question For Product
        </p>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Create At"
              content={new Date(record.createdAt).toLocaleString("en-GB")}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              className="drawer_question-des"
              style={{ textTransform: "capitalize" }}
            >
              {record.question}
            </div>
          </Col>
        </Row>
        <p className="drawer_question-header">
          <SendOutlined style={{ marginRight: 10 }} />
          Action
        </p>
        <Row>
          <Col style={{ display: "flex" }} span={12}>
            <Button
              style={{ margin: "0 auto" }}
              type="primary"
              onClick={showDrawerChild}
            >
              Confirm And Reply
            </Button>
            <Drawer
              title="Answer User Questions"
              width={600}
              closable={false}
              onClose={handleOnCloseDrawerChild}
              visible={visibleDrawerChild}
            >
              <Form
                onFinish={onConfirmPendingQuestion}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Form.Item name="replyQuestion" label="Reply">
                  <Input.TextArea autoSize={{ minRows: 4, maxRows: 10 }} />
                </Form.Item>
                <Form.Item style={{ margin: "0 auto" }}>
                  <Button type="primary" htmlType="submit">
                    Confirm And Save
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
          </Col>
          <Col style={{ display: "flex" }} span={12}>
            <Button
              style={{ margin: "0 auto" }}
              type="primary"
              danger
              onClick={() => handleRejectPendingQuestion(record._id)}
            >
              Reject
            </Button>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}

export default DrawerQuestion;
