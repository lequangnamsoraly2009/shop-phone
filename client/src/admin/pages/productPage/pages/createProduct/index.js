import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Input, Form, Select, Button, Spin } from "antd";
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
  const [imageThumbnail1, setImageThumbnail1] = useState({});
  const [imageThumbnail2, setImageThumbnail2] = useState({});
  const [imageThumbnail3, setImageThumbnail3] = useState({});
  const [imageThumbnail4, setImageThumbnail4] = useState({});
  const [loading, setLoading] = useState(false);
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
        const {
          screenTechnology,
          resolutionScreen,
          FPS,
          maximumBrightness,
          resolutionRear,
          flash,
          resolutionFront,
          os,
          chip,
          cpuSpeed,
          gpu,
          ram,
          internalMemory,
          memoryStick,
          bluetooth,
          chargingInterface,
          headphoneJack,
          batteryCapacity,
          batteryType,
          weight,
          releaseTime,
          design,
        } = values;

        const display = {
          screenTechnology,
          resolutionScreen,
          FPS,
          maximumBrightness,
        };
        const rearCamera = {
          resolutionRear,
          flash,
        };
        const frontCamera = {
          resolutionFront,
        };
        const cpu = {
          os,
          chip,
          cpuSpeed,
          gpu,
        };
        const memoryAndStorage = {
          ram,
          internalMemory,
          memoryStick,
        };
        const connect = {
          bluetooth,
          chargingInterface,
          headphoneJack,
        };
        const batteries = {
          batteryCapacity,
          batteryType,
        };
        const general = {
          weight,
          releaseTime,
          design,
        };
        let images = { ...image };
        const product = {
          ...values,
          display,
          rearCamera,
          frontCamera,
          cpu,
          memoryAndStorage,
          connect,
          batteries,
          general,
          nameCategory: nameCate,
          images: images,
        };
        await ProductFilterAPI.editProduct({
          paramID: param.id,
          product,
          token,
        });
        setImage({});
        setImageThumbnail1({});
        setImageThumbnail2({});
        setImageThumbnail3({});
        setImageThumbnail4({});
        history.push("/admin/products");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update product successfully! Check it ",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const {
          screenTechnology,
          resolutionScreen,
          FPS,
          maximumBrightness,
          resolutionRear,
          flash,
          resolutionFront,
          os,
          chip,
          cpuSpeed,
          gpu,
          ram,
          internalMemory,
          memoryStick,
          bluetooth,
          chargingInterface,
          headphoneJack,
          batteryCapacity,
          batteryType,
          weight,
          releaseTime,
          design,
        } = values;

        const display = {
          screenTechnology,
          resolutionScreen,
          FPS,
          maximumBrightness,
        };
        const rearCamera = {
          resolutionRear,
          flash,
        };
        const frontCamera = {
          resolutionFront,
        };
        const cpu = {
          os,
          chip,
          cpuSpeed,
          gpu,
        };
        const memoryAndStorage = {
          ram,
          internalMemory,
          memoryStick,
        };
        const connect = {
          bluetooth,
          chargingInterface,
          headphoneJack,
        };
        const batteries = {
          batteryCapacity,
          batteryType,
        };
        const general = {
          weight,
          releaseTime,
          design,
        };
        let images = { ...image?.response };
        let subImages = [
          ...imageThumbnail1?.response,
          ...imageThumbnail2?.response,
          ...imageThumbnail3?.response,
          ...imageThumbnail4?.response,
        ];

        const product = {
          ...values,
          display,
          rearCamera,
          frontCamera,
          cpu,
          memoryAndStorage,
          connect,
          batteries,
          general,
          nameCategory: nameCate,
          images: images,
          subImages: subImages,
        };
        await ProductFilterAPI.createProduct({ product, token });
        setImage({});
        setImageThumbnail1({});
        setImageThumbnail2({});
        setImageThumbnail3({});
        setImageThumbnail4({});
        history.push("/admin/products");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Create product successfully! Check it ",
          showConfirmButton: false,
          timer: 2000,
        });
      }
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
  const callbackFunction1 = (childData) => {
    setImageThumbnail1(childData);
  };
  const callbackFunction2 = (childData) => {
    setImageThumbnail2(childData);
  };
  const callbackFunction3 = (childData) => {
    setImageThumbnail3(childData);
  };
  const callbackFunction4 = (childData) => {
    setImageThumbnail4(childData);
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
            screenTechnology: product.display.screenTechnology,
            resolutionScreen: product.display.resolutionScreen,
            FPS: product.display.FPS,
            maximumBrightness: product.display.maximumBrightness,
            resolutionRear: product.rearCamera.resolutionRear,
            flash: product.rearCamera.flash,
            resolutionFront: product.frontCamera.resolutionFront,
            os: product.cpu.os,
            chip: product.cpu.chip,
            cpuSpeed: product.cpu.cpuSpeed,
            gpu: product.cpu.gpu,
            ram: product.memoryAndStorage.ram,
            internalMemory: product.memoryAndStorage.internalMemory,
            memoryStick: product.memoryAndStorage.memoryStick,
            bluetooth: product.connect.bluetooth,
            chargingInterface: product.connect.chargingInterface,
            headphoneJack: product.connect.headphoneJack,
            batteryCapacity: product.batteries.batteryCapacity,
            batteryType: product.batteries.batteryType,
            weight: product.general.weight,
            releaseTime: product.general.releaseTime,
            design: product.general.design,
          });
          setImage(product.images);
        }
      });
    } else {
      setOnEdit(false);
    }
  }, [param.id, productsFilter, form]);

  return (
    <>
      {loading === true ? (
        <div className="loading_product">
          <Spin
            style={{
              margin: "300px auto",
              opacity: "1",
              background: "rgba(256,256,256,0.1)",
            }}
            size="large"
          />
        </div>
      ) : (
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
                  setLoading={setLoading}
                />
                <span>Thumbnail</span>
              </div>
              <div className="create_upload-img-up">
                <UploadImage
                  images={imageThumbnail1}
                  param={param}
                  parentCallback={callbackFunction1}
                  onEdit={onEdit}
                  setLoading={setLoading}
                />
                <span>Thumbnail 1</span>
              </div>
              <div className="create_upload-img-up">
                <UploadImage
                  images={imageThumbnail2}
                  param={param}
                  parentCallback={callbackFunction2}
                  onEdit={onEdit}
                  setLoading={setLoading}
                />
                <span>Thumbnail 2</span>
              </div>
              <div className="create_upload-img-up">
                <UploadImage
                  images={imageThumbnail3}
                  param={param}
                  parentCallback={callbackFunction3}
                  onEdit={onEdit}
                  setLoading={setLoading}
                />
                <span>Thumbnail 3</span>
              </div>
              <div className="create_upload-img-up">
                <UploadImage
                  images={imageThumbnail4}
                  param={param}
                  parentCallback={callbackFunction4}
                  onEdit={onEdit}
                  setLoading={setLoading}
                />
                <span>Thumbnail 4</span>
              </div>
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
                <h3 style={{ color: "rgb(25,144,255)" }}>Main:</h3>
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
                  rules={[
                    { required: true, message: "Please input product ID!" },
                  ]}
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
                  <Select showSearch placeholder="Default: Stocking">
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
                    {
                      required: true,
                      message: "Please select color for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select color for product"
                  >
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
                <h3 style={{ color: "rgb(25,144,255)" }}>Display Product:</h3>
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
                  <Select
                    showSearch
                    placeholder="Search or select Screen Technology for product"
                  >
                    <Option value="LCD">LCD</Option>
                    <Option value="TFT - LCD">TFT - LCD</Option>
                    <Option value="Super LCD">Super LCD</Option>
                    <Option value="IPS LCD">IPS LCD</Option>
                    <Option value="LED-backlit IPS LCD">
                      LED-backlit IPS LCD
                    </Option>
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
                  name="resolutionScreen"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select resolution for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select resolution for product"
                  >
                    <Option value="QQVGA (120 x 160 pixels)">
                      QQVGA (120 x 160 pixels)
                    </Option>
                    <Option value="QVGA (320 x 240 pixels)">
                      QVGA (320 x 240 pixels)
                    </Option>
                    <Option value="WQVGA (428 x 240 pixels)">
                      WQVGA (428 x 240 pixels)
                    </Option>
                    <Option value="VGA (640 x 480 pixels)">
                      VGA (640 x 480 pixels)
                    </Option>
                    <Option value="WVGA (768 x 480 pixels)">
                      WVGA (768 x 480 pixels)
                    </Option>
                    <Option value="FWVGA (854 x 480 pixels)">
                      FWVGA (854 x 480 pixels)
                    </Option>
                    <Option value="SVGA (800 x 600 pixels)">
                      SVGA (800 x 600 pixels)
                    </Option>
                    <Option value="DVGA (960 x 640 pixels)">
                      DVGA (960 x 640 pixels)
                    </Option>
                    <Option value="qHD (960 x 540 pixels)">
                      qHD (960 x 540 pixels)
                    </Option>
                    <Option value="HD (1.280 × 720 pixels)">
                      HD (1.280 × 720 pixels)
                    </Option>
                    <Option value="HD+ (1.440 x 720 pixels)">
                      HD+ ( 1.440 x 720 pixels)
                    </Option>
                    <Option value="XGA (1.024 x 768 pixels)">
                      XGA (1.024 x 768 pixels)
                    </Option>
                    <Option value="WXGA (1.366 x 768 pixels)">
                      WXGA (1.366 x 768 pixels)
                    </Option>
                    <Option value="QVGA (320 x 240 pixels)">
                      QVGA (320 x 240 pixels)
                    </Option>
                    <Option value="Full HD (1.920 × 1.080 pixels)">
                      Full HD (1.920 × 1.080 pixels)
                    </Option>
                    <Option value="FHD+ (2.160 x 1.080 pixels)">
                      FHD+ (2.160 x 1.080 pixels)
                    </Option>
                    <Option value="2K (2.560 x 1.440 pixels)">
                      2K (2.560 x 1.440 pixels)
                    </Option>
                    <Option value="2K+ (2.960 x 1.440 pixelss)">
                      2K+ (2.960 x 1.440 pixels)
                    </Option>
                    <Option value="4K (3.840 x 2.160 pixels)">
                      4K (3.840 x 2.160 pixels)
                    </Option>
                    <Option value="Ultra HD (5.120 x 2.880 pixels)">
                      Ultra HD (5.120 x 2.880 pixels)
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="FPS"
                  name="FPS"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select frame per second for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select frame per second for product"
                  >
                    <Option value="60Hz">60Hz</Option>
                    <Option value="70Hz">70Hz</Option>
                    <Option value="90Hz">90Hz</Option>
                    <Option value="120Hz">120Hz</Option>
                    <Option value="144Hz">144Hz</Option>
                    <Option value="240Hz">240Hz</Option>
                    <Option value="256Hz">256Hz</Option>
                    <Option value="360Hz">360Hz</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Maximum Brightness"
                  name="maximumBrightness"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select Maximum Brightness for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select maximum brightness for product"
                  >
                    <Option value="200nits">200nits</Option>
                    <Option value="300nits">300nits</Option>
                    <Option value="400nits">400nits</Option>
                    <Option value="500nits">500nits</Option>
                    <Option value="600nits">600nits</Option>
                    <Option value="700nits">700nits</Option>
                    <Option value="800nits">800nits</Option>
                    <Option value="900nits">900nits</Option>
                    <Option value="1000nits">1000nits</Option>
                    <Option value="1100nits">1100nits</Option>
                    <Option value="1200nits">1200nits</Option>
                    <Option value="1300nits">1300nits</Option>
                  </Select>
                </Form.Item>
                <h3 style={{ color: "rgb(25,144,255)" }}>Rare Camera:</h3>
                <Form.Item
                  label="Resolution"
                  name="resolutionRear"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select resolution for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select resolution for product"
                  >
                    <Option value="1MP">1MP</Option>
                    <Option value="2MP">2MP</Option>
                    <Option value="3MP">3MP</Option>
                    <Option value="4MP">4MP</Option>
                    <Option value="5MP">5MP</Option>
                    <Option value="8MP">8MP</Option>
                    <Option value="12MP">12MP</Option>
                    <Option value="16MP">16MP</Option>
                    <Option value="24MP">24MP</Option>
                    <Option value="36MP">36MP</Option>
                    <Option value="48MP">48MP</Option>
                    <Option value="64MP">64MP</Option>
                    <Option value="128MP">128MP</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Flash"
                  name="flash"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Yes or No",
                    },
                  ]}
                >
                  <Select showSearch placeholder="Yes or No">
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
                <h3 style={{ color: "rgb(25,144,255)" }}>Front Camera:</h3>
                <Form.Item
                  label="Resolution"
                  name="resolutionFront"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select resolution for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select resolution for product"
                  >
                    <Option value="1MP">1MP</Option>
                    <Option value="2MP">2MP</Option>
                    <Option value="3MP">3MP</Option>
                    <Option value="4MP">4MP</Option>
                    <Option value="5MP">5MP</Option>
                    <Option value="8MP">8MP</Option>
                    <Option value="8MP">10MP</Option>
                    <Option value="12MP">12MP</Option>
                    <Option value="16MP">16MP</Option>
                    <Option value="24MP">24MP</Option>
                    <Option value="36MP">36MP</Option>
                    <Option value="48MP">48MP</Option>
                    <Option value="64MP">64MP</Option>
                    <Option value="128MP">128MP</Option>
                  </Select>
                </Form.Item>
                <h3 style={{ color: "rgb(25,144,255)" }}>
                  CPU And Operating System:
                </h3>
                <Form.Item
                  label="Operating System"
                  name="os"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select Operating System for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select Operating System for product"
                  >
                    <Option value="Android 1.5">Android 1.5</Option>
                    <Option value="Android 1.6">Android 1.6</Option>
                    <Option value="Android 2.0">Android 2.0</Option>
                    <Option value="Android 2.2">Android 2.2</Option>
                    <Option value="Android 3.0">Android 3.0</Option>
                    <Option value="Android 4.0">Android 4.0</Option>
                    <Option value="Android 4.1">Android 4.1</Option>
                    <Option value="Android 4.4">Android 4.4</Option>
                    <Option value="Android 5.0">Android 5.0</Option>
                    <Option value="Android 6.0">Android 6.0</Option>
                    <Option value="Android 7.0">Android 7.0</Option>
                    <Option value="Android 8.0">Android 8.0</Option>
                    <Option value="Android 9.0">Android 9.0</Option>
                    <Option value="Android 10.0">Android 10.0</Option>
                    <Option value="Android 11.0">Android 11.0</Option>
                    <Option value="iOS 4">iOS 4</Option>
                    <Option value="iOS 5">iOS 5</Option>
                    <Option value="iOS 6">iOS 6</Option>
                    <Option value="iOS 7">iOS 7</Option>
                    <Option value="iOS 8">iOS 8</Option>
                    <Option value="iOS 9">iOS 9</Option>
                    <Option value="iOS 10">iOS 10</Option>
                    <Option value="iOS 11">iOS 11</Option>
                    <Option value="iOS 12">iOS 12</Option>
                    <Option value="iOS 13">iOS 13</Option>
                    <Option value="iOS 14">iOS 14</Option>
                    <Option value="iOS 15">iOS 15</Option>
                    <Option value="BlackBerry OS">BlackBerry OS</Option>
                    <Option value="Windows Mobile OS">Windows Mobile OS</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Chipset"
                  name="chip"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select Chipset for product!",
                    },
                  ]}
                >
                  <Input placeholder="Snapdragon 888 Gold" />
                </Form.Item>
                <Form.Item
                  label="CPU Speed"
                  name="cpuSpeed"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select CPU Speed for product!",
                    },
                  ]}
                >
                  <Input placeholder="1.8 GHz" />
                </Form.Item>
                <Form.Item
                  label="GPU"
                  name="gpu"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select GPU for product!",
                    },
                  ]}
                >
                  <Input placeholder="Adreno 610" />
                </Form.Item>
                <h3 style={{ color: "rgb(25,144,255)" }}>
                  Memory And Storage:
                </h3>
                <Form.Item
                  label="RAM"
                  name="ram"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select RAM for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select RAM for product"
                  >
                    <Option value="512 MB">512 MB</Option>
                    <Option value="1 GB">1 GB</Option>
                    <Option value="2 GB">2 GB</Option>
                    <Option value="4 GB">4 GB</Option>
                    <Option value="8 GB">8 GB</Option>
                    <Option value="8 GB">12 GB</Option>
                    <Option value="16 GB">16 GB</Option>
                    <Option value="32 GB">32 GB</Option>
                    <Option value="64 GB">64 GB</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Internal Memory"
                  name="internalMemory"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select internal Memory for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select internal Memory  for product"
                  >
                    <Option value="512 MB">512 MB</Option>
                    <Option value="1 GB">1 GB</Option>
                    <Option value="2 GB">2 GB</Option>
                    <Option value="4 GB">4 GB</Option>
                    <Option value="8 GB">8 GB</Option>
                    <Option value="16 GB">16 GB</Option>
                    <Option value="32 GB">32 GB</Option>
                    <Option value="64 GB">64 GB</Option>
                    <Option value="128 GB">128 GB</Option>
                    <Option value="256 GB">256 GB</Option>
                    <Option value="512 GB">512 GB</Option>
                    <Option value="1024 GB">1024 GB</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Memory Stick"
                  name="memoryStick"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select memory Stick for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select memory Stick for product"
                  >
                    <Option value="Max 512 MB">Max 512 MB</Option>
                    <Option value="Max 1 GB">Max 1 GB</Option>
                    <Option value="Max 2 GB">Max 2 GB</Option>
                    <Option value="Max 4 GB">Max 4 GB</Option>
                    <Option value="Max 8 GB">Max 8 GB</Option>
                    <Option value="Max 16 GB">Max 16 GB</Option>
                    <Option value="Max 32 GB">Max 32 GB</Option>
                    <Option value="Max 64 GB">Max 64 GB</Option>
                    <Option value="Max 128 GB">Max 128 GB</Option>
                    <Option value="Max 256 GB">Max 256 GB</Option>
                    <Option value="Max 512 GB">Max 512 GB</Option>
                    <Option value="Max 1024 GB">Max 1024 GB</Option>
                  </Select>
                </Form.Item>
                <h3 style={{ color: "rgb(25,144,255)" }}>Connect:</h3>

                <Form.Item
                  label="Bluetooth"
                  name="bluetooth"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select bluetooth for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select bluetooth for product"
                  >
                    <Option value="v1.2">v1.2</Option>
                    <Option value="v2.1">v2.1</Option>
                    <Option value="v3.0">v3.0</Option>
                    <Option value="v4.0">v4.0</Option>
                    <Option value="v4.1">v4.1</Option>
                    <Option value="v4.2">v4.2</Option>
                    <Option value="v5.0">v5.0</Option>
                    <Option value="v5.0">v5.2</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Charging Interface"
                  name="chargingInterface"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select Charging Interface for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select Charging Interface for product"
                  >
                    <Option value="Micro USB">Micro USB</Option>
                    <Option value="USB-Type C ">USB-Type C </Option>
                    <Option value="Lightning">Lightning</Option>
                    <Option value="OTG">OTG</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Headphone Jack"
                  name="headphoneJack"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select Headphone Jack for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select Headphone Jack for product"
                  >
                    <Option value="3.5mm">3.5mm</Option>
                    <Option value="2.5mm">2.5mm</Option>
                    <Option value="Lightning">Lightning</Option>
                    <Option value="No Jack">No Jack</Option>
                  </Select>
                </Form.Item>
                <h3 style={{ color: "rgb(25,144,255)" }}>Batteries:</h3>
                <Form.Item
                  label="Battery Capacity"
                  name="batteryCapacity"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select Battery Capacity for product!",
                    },
                  ]}
                >
                  <Input placeholder="2400 mAh" />
                </Form.Item>
                <Form.Item
                  label="Battery Type"
                  name="batteryType"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select Battery Type for product!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search or select Battery Type for product"
                  >
                    <Option value="Li-Ion">Li-Ion</Option>
                    <Option value="Li-Po">Li-Po</Option>
                    <Option value="Cell pin">Cell pin</Option>
                  </Select>
                </Form.Item>
                <h3 style={{ color: "rgb(25,144,255)" }}>General:</h3>
                <Form.Item
                  label="Weight"
                  name="weight"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select weight for product!",
                    },
                  ]}
                >
                  <Input placeholder="120g" />
                </Form.Item>
                <Form.Item
                  label="Release Time"
                  name="releaseTime"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select release time for product!",
                    },
                  ]}
                >
                  <Input placeholder="12/2020" />
                </Form.Item>
                <Form.Item
                  label="Design Style"
                  name="design"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select design style for product!",
                    },
                  ]}
                >
                  <Input placeholder="Monolithic" />
                </Form.Item>
                <h3 style={{ color: "rgb(25,144,255)" }}>Additional:</h3>
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
                    {
                      required: true,
                      message: "Please enter quantity in stock!",
                    },
                  ]}
                >
                  <Input placeholder="Units" type="number" />
                </Form.Item>
                <Form.Item
                  label="Sale Offer"
                  name="sale"
                  rules={[
                    { required: true, message: "0% -> 99%", min: 0, max: 2 },
                  ]}
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
      )}
    </>
  );
}

export default CreateProduct;
