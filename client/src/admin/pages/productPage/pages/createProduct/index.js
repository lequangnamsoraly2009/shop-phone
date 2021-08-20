import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Input, Form, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import UploadImage from "../uploadImage";
import "./createProduct.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import ProductFilterAPI from "../../../../../api/productAPI";
import { getAllCategories } from "../../../../../app/categorySlice";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function CreateProduct() {
  const [image, setImage] = useState({});
  // Check form edit or form create
  const [onEdit, setOnEdit] = useState(false);
  // Vcl that chu' . initialValues không được xét bằng useState. Muốn thay đổi initialValues bằng dynamic thì dùng form.setFieldsValue() -> Mất 2 tiếng ngu
  const [form] = Form.useForm();

  const { categories } = useSelector((state) => state.categories);
  const { productsFilter } = useSelector((state) => state.productsFilter);
  const { token } = useSelector((state) => state.token);

  const history = useHistory();
  const param = useParams();
  const dispatch = useDispatch();

  const backPreviousPage = (e) => {
    e.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    dispatch(getAllCategories(""));
  }, [dispatch]);

  const onFinishForm = async (values) => {
    try {
      let nameCate = {};
      categories.forEach((item) => {
        if (item._id === values.category) {
          nameCate = item.nameCategory;
        }
      });
      if (onEdit) {
        let images = { ...image };
        const product = { ...values, nameCategory: nameCate, images: images };
        await ProductFilterAPI.editProduct({
          paramID: param.id,
          product,
          token,
        });
      } else {
        let images = { ...image?.response };
        const product = { ...values, nameCategory: nameCate, images: images };
        await ProductFilterAPI.createProduct({ product, token });
      }
      setImage({});
      history.push("/admin/products");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Create product successfully! Check it ",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something wrong. Please try create product again ! ",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const callbackFunction = (childData) => {
    setImage(childData);
  };
  // Area Update Product
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      productsFilter.forEach((product) => {
        if (product._id === param.id) {
          form.setFieldsValue({
            category: product.category,
            color: product.color,
            description: product.description,
            memory: product.memory,
            price: product.price,
            product_id: product.product_id,
            sale: product.sale,
            status: product.status,
            storage: product.storage,
            title: product.title,
            _id: product._id,
          });
          setImage(product.images);
        }
      });
    } else {
      setOnEdit(false);
    }
  }, [param.id, productsFilter, form]);

  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>
          <Button
            style={{ marginRight: 10 }}
            type="dashed"
            icon={<ArrowLeftOutlined />}
            onClick={backPreviousPage}
          />
          Create New Product
        </h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/products">Products</Breadcrumb.Item>
          <Breadcrumb.Item>
            {!onEdit ? "Create" : "Update"} Product
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="create_header">
        <div className="create_header-title">
          <span>{!onEdit ? "CREATE" : "UPDATE"} NEW PRODUCT</span>
        </div>
      </div>
      <div className="create_content">
        <div className="create_upload-img">
          <div className="create_upload-img-title">
            <span>Upload Image:</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage
              images={image}
              param={param}
              parentCallback={callbackFunction}
              onEdit={onEdit}
            />
            <span>Thumbnail</span>
          </div>
          {/* <div className="create_upload-img-up">
            <UploadImage />
            <span>Image 1</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage />
            <span>Image 2</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage />
            <span>Image 3</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage />
            <span>Image 4</span>
          </div> */}
        </div>
        <div className="create_upload-info">
          <Form
            onFinish={onFinishForm}
            {...layout}
            size="middle"
            form={form}
            initialValues={{
              status: "Stocking",
            }}
          >
            <Form.Item
              label="Product Name"
              name="title"
              rules={[
                { required: true, message: "Please input product name!" },
              ]}
            >
              <Input placeholder="iPhone 12 Pro XS Max..." />
            </Form.Item>
            <Form.Item
              label="Product ID"
              name="product_id"
              rules={[{ required: true, message: "Please input product ID!" }]}
            >
              <Input placeholder="IP12PRM" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description product!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Monolithic synchronous design with sharp details..."
                showCount
                maxLength={300}
                autoSize={{ maxRows: 2 }}
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select category for product!",
                },
              ]}
            >
              <Select showSearch placeholder="Please select a category">
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.nameCategory}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Status" name="status" hasFeedback>
              <Select  showSearch placeholder="Default: Stocking">
                <Option value="Stocking">Stocking</Option>
                <Option value="OutStocking">OutStocking</Option>
                <Option value="Importing">Importing</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Color"
              name="color"
              hasFeedback
              rules={[
                { required: true, message: "Please select color for product!" },
              ]}
            >
              <Select showSearch placeholder="Please select color for product">
                <Option value="yellow">Yellow</Option>
                <Option value="gold">Gold</Option>
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="pink">Pink</Option>
                <Option value="black">Black</Option>
                <Option value="white">White</Option>
                <Option value="orange">Orange</Option>
                <Option value="silver">Silver</Option>
              </Select>
            </Form.Item>
            <h3 style={{color: "rgb(25,144,255)"}}>Display Product:</h3>
            <Form.Item
              label="Screen Technology"
              name="screenTechnology"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select Screen Technology for product!",
                },
              ]}
            >
              <Select showSearch placeholder="Please select Screen Technology for product">
                <Option value="LCD">LCD</Option>
                <Option value="TFT - LCD">TFT - LCD</Option>
                <Option value="Super LCD">Super LCD</Option>
                <Option value="IPS LCD">IPS LCD</Option>
                <Option value="LED-backlit IPS LCD">LED-backlit IPS LCD</Option>
                <Option value="LTPS LCD">LTPS LCD</Option>
                <Option value="IPS Quantum">IPS Quantum</Option>
                <Option value="OLED">OLED</Option>
                <Option value="AMOLED">AMOLED</Option>
                <Option value="Super AMOLED">Super AMOLED</Option>
                <Option value="Super AMOLED Plus">Super AMOLED Plus</Option>
                <Option value="Super AMOLED HD">Super AMOLED HD</Option>
                <Option value="P-OLED">P-OLED</Option>
                <Option value="ClearBlack">ClearBlack</Option>
                <Option value="NOVA">NOVA</Option>
                <Option value="Mobile BRAVIA Engine">
                  Mobile BRAVIA Engine
                </Option>
                <Option value="Retina">Retina</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Resolution"
              name="resolution"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select resolution for product!",
                },
              ]}
            >
              <Select showSearch placeholder="Please select resolution for product">
                <Option value="QQVGA (120 x 160 pixels)">QQVGA (120 x 160 pixels)</Option>
                <Option value="QVGA (320 x 240 pixels)">QVGA (320 x 240 pixels)</Option>
                <Option value="WQVGA (428 x 240 pixels)">WQVGA (428 x 240 pixels)</Option>
                <Option value="VGA (640 x 480 pixels)">VGA (640 x 480 pixels)</Option>
                <Option value="WVGA (768 x 480 pixels)">WVGA (768 x 480 pixels)</Option>
                <Option value="FWVGA (854 x 480 pixels)">FWVGA (854 x 480 pixels)</Option>
                <Option value="SVGA (800 x 600 pixels)">SVGA (800 x 600 pixels)</Option>
                <Option value="DVGA (960 x 640 pixels)">DVGA (960 x 640 pixels)</Option>
                <Option value="qHD (960 x 540 pixels)">qHD (960 x 540 pixels)</Option>
                <Option value="HD (1.280 × 720 pixels)">HD (1.280 × 720 pixels)</Option>
                <Option value="HD+ (1.440 x 720 pixels)">HD+  ( 1.440 x 720 pixels)</Option>
                <Option value="XGA (1.024 x 768 pixels)">XGA (1.024 x 768 pixels)</Option>
                <Option value="WXGA (1.366 x 768 pixels)">WXGA (1.366 x 768 pixels)</Option>
                <Option value="QVGA (320 x 240 pixels)">QVGA (320 x 240 pixels)</Option>
                <Option value="Full HD (1.920 × 1.080 pixels)">Full HD (1.920 × 1.080 pixels)</Option>
                <Option value="FHD+ (2.160 x 1.080 pixels)">FHD+ (2.160 x 1.080 pixels)</Option>
                <Option value="2K (2.560 x 1.440 pixels)">2K (2.560 x 1.440 pixels)</Option>
                <Option value="2K+ (2.960 x 1.440 pixelss)">2K+ (2.960 x 1.440 pixels)</Option>
                <Option value="4K (3.840 x 2.160 pixels)">4K (3.840 x 2.160 pixels)</Option>
                <Option value="Ultra HD (5.120 x 2.880 pixels)">Ultra HD (5.120 x 2.880 pixels)</Option>

              </Select>
            </Form.Item>

            {/* <Form.Item
              label="Memory"
              name="memory"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select memory for product!",
                },
              ]}
            >
              <Select placeholder="Please select memory for product">
                <Option value="16">16</Option>
                <Option value="32">32</Option>
                <Option value="64">64</Option>
                <Option value="128">128</Option>
                <Option value="256">256</Option>
                <Option value="512">512</Option>
                <Option value="1024">1024</Option>
              </Select>
            </Form.Item> */}
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input price product!" },
              ]}
            >
              <Input placeholder="Units in USD" type="number" />
            </Form.Item>
            <Form.Item
              label="Storage"
              name="storage"
              rules={[
                { required: true, message: "Please enter quantity in stock!" },
              ]}
            >
              <Input placeholder="Units" type="number" />
            </Form.Item>
            <Form.Item
              label="Sale Offer"
              name="sale"
              rules={[{ required: true, message: "0% -> 99%", min: 0, max: 2 }]}
            >
              <Input placeholder="10%" type="number" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                {onEdit ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
