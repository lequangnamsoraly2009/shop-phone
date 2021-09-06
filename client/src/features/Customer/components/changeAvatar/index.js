import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserAPI from "../../../../api/userAPI";
import Swal from "sweetalert2";
import UploadAvatar from "../uploadImage";
import "./changeAvatar.css";
import CommonLoading from "react-loadingg/lib/CommonLoading";

function ChangeAvatar() {
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    if (user.avatar) {
      setOnEdit(true);
    } else {
      setOnEdit(false);
    }
  }, [user]);

  const callbackFunction = async (childData) => {
    try {
      await UserAPI.changeAvatarUser({ token, user: user, avatar: childData });
      setOnEdit(true);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        text: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <div style={{ position: "relative" }} className="avatar-container">
      {loading === true ? (
        <div
          style={{
            position: "absolute",
            zIndex: 999,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            opacity: 0.5,
          }}
        >
          {" "}
          <CommonLoading color="rgb(25,144,255)" />{" "}
        </div>
      ) : (
        ""
      )}
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
            images={user.avatar}
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
