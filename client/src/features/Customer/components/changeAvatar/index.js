import React, { useState } from "react";
import { useSelector } from "react-redux";
import UploadAvatar from "../uploadImage";
import "./changeAvatar.css";

function ChangeAvatar() {
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const {user} = useSelector((state) => state.user);

  console.log(image)


  const callbackFunction = (childData) => {
    setImage(childData);
  };
  return (
    <div className="avatar-container">
      <div className="avatar-banner">
        <span>
          By choosing to change your avatar, You have accepted to delete the old
          photo and replace it with the new one 😘 !
        </span>
      </div>
      <div className="infor-header">
        <span>Change Avatar</span>
      </div>
      <div className="avatar-main">
        <div className="create_upload-img-up">
          <UploadAvatar
            images={image}
            userId={user._id}
            parentCallback={callbackFunction}
            onEdit={onEdit}
            setLoading={setLoading}
          />
        </div>
        <span className="avatar-main-name">Your Avatar</span>
      </div>
    </div>
  );
}

export default ChangeAvatar;
