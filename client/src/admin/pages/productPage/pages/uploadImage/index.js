import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../../../api/axiosClient";
import Swal from "sweetalert2";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function UploadImage(props) {

  const [file, setFile] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  // Load image when edit image
  useEffect(() => {
    if(props.param.id) {
      if(props.images.url === undefined){
        console.log("Edit success image")
      }
      else{
        setFile([{uid: "-1",name: "Test_thoi_lam_gi_cang.jpeg", status: "done", url: props.images?.url}])
      }
    }
  },[props.param.id,props.images?.url])

  const { token } = useSelector((state) => state.token);

  const onChange = ({ fileList: newFileList }) => {
    if(props.param.id){
      setFile(newFileList);
    }
    else{
      setFile(newFileList);
    }
    const status = newFileList[0]?.status;
    if (status === "done") {
      props.parentCallback(newFileList[0]);
      if(props.onEdit){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update Image Different Success",
          showConfirmButton: false,
          timer: 2000,
        });
      }else{
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
      // Nếu edit thì nhảy vào cái này
      if(props.onEdit===true){
        await API.post(
          "/api/admin/delete-image",
          { public_id: props.images?.public_id },
          {
            headers: { Authorization: token },
          }
        );
      }else{
        await API.post(
          "/api/admin/delete-image",
          { public_id: file.response.public_id },
          {
            headers: { Authorization: token },
          }
        );
      }
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
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default UploadImage;
