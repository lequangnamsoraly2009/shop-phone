import { PlusOutlined } from "@ant-design/icons";
import { Spin, Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ProductFilterAPI from "../../../../api/productAPI";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function UploadAvatar(props) {
  const [file, setFile] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const { token } = useSelector((state) => state.token);

  // Load image when edit image and dont set new Image here
  useEffect(() => {
    if (props.param.id) {
      if (props.images?.url === undefined) {
        setFile([]);
      } else {
        setFile([
          {
            uid: "-1",
            name: "Preview Image By Soraly",
            status: "done",
            url: props.images?.url,
          },
        ]);
      }
    }
  }, [props.param.id, props.images?.url]);

  const onChange = ({ fileList: newFileList }) => {
    // On Edit -> Update Image Here
    if (props.param.id) {
      if (newFileList === undefined) {
        props.parentCallback(props.images);
      } else {
        setFile(newFileList);
        const status = newFileList[0]?.status;
        if (status === "done") {
          props.parentCallback(newFileList[0].response);
          if (props.onEdit) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Update Image Different Success",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      }
    }
    // On Create -> Create Image Here
    else {
      setFile(newFileList);
      const status = newFileList[0]?.status;
      if (status === "done") {
        props.parentCallback(newFileList[0].response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Image Upload Success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const onRemove = async (file) => {
    try {
      // Nếu edit thì nhảy vào cái này => nó cũng là xóa
      props.setLoading(true);
      if (props.onEdit === true) {
        await ProductFilterAPI.deleteImageClound(
          props.images?.public_id,
          token,
          props.param.id
        );
        setFile([]);
        props.parentCallback({});
      } else {
        await ProductFilterAPI.deleteImageClound(
          file.response.public_id,
          token
        );
        setFile([]);
        props.parentCallback({});
      }
      props.setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Image Delete Success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something wrong. Please try again ! ",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action={"http://localhost:3001/api/admin/upload-image"}
        listType="picture-card"
        fileList={file}
        onPreview={handlePreview}
        onChange={onChange}
        onRemove={onRemove}
      >
        {file.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={
          <>
            <Spin size="small" />
          </>
        }
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default UploadAvatar;
