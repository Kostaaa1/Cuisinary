import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../../../common/Loading";
import SectionInfo from "../../../common/SectionInfo";
import AuthContext from "../../../setup/app-context-menager/AuthContext";
import {
  AddAPhoto,
  KeyboardArrowDown,
  SupervisorAccount,
} from "@mui/icons-material";
import { useRef } from "react";
import useAddFixed from "../hooks/useAddFixed";
import { useUser } from "../../../setup/auth/useAuth";

const PublicInfo = () => {
  const { userData } = useUser();
  const [clicked, setClicked] = useState(true);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const { user } = useAuth0();
  const [buttonSave, setButtonSave] = useState(false);
  const [tagline, setTagline] = useState(userData?.tagline);
  const [displayName, setDisplayName] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const publicRef = useRef(null);
  useAddFixed(publicRef);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleImage = (e) => {
    if (e.target.value !== "") {
      setButtonSave(true);
    }

    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  useEffect(() => {
    if (userData) setTagline(userData.tagline);
  }, [userData]);

  const submitForm = async (e) => {
    try {
      e.preventDefault();

      setShowLoading(true);
      const form = { displayName, tagline };
      const formData = new FormData();
      if (form.displayName || form.tagline) {
        await axios.post(`/api/user/${user.email}`, {
          user: { nickname: form.displayName, tagline: form.tagline },
        });
      }
      if (image) {
        formData.append("file", image);
        await axios.post(`/api/user/${user?.email}/addImage`, formData);
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <>
        <div className="public-section" ref={publicRef}>
          <h1>Public Profile Settings</h1>

          {showLoading ? (
            <button className={"btn-save"}>
              <Loading className="scaled-loading" />
            </button>
          ) : (
            <>
              {buttonSave ? (
                <input
                  type="submit"
                  value={"SAVE CHANGES"}
                  className={`btn-save highlight`}
                />
              ) : (
                <input
                  type="submit"
                  value={"SAVE CHANGES"}
                  disabled
                  className={`btn-save`}
                />
              )}
            </>
          )}
        </div>
        <SectionInfo
          value={
            "The information on this page will be displayed on your public profile, which is visible to other users."
          }
          icon={<SupervisorAccount />}
          text={
            "The information on this page will be displayed publicly and will be visible to others"
          }
        />
        <DynamicForm>
          <div className="head-info" onClick={() => setClicked(!clicked)}>
            <h3>About Me</h3>
            <KeyboardArrowDown className={clicked ? "click" : ""} />
          </div>
          {clicked && (
            <>
              <div className="input-container">
                <div className="form-control">
                  <div className="input-wrapper">
                    <label>Display Name</label>
                    <input
                      type="text"
                      placeholder={userData?.nickname}
                      onChange={(e) => {
                        setDisplayName(e.target.value), setButtonSave(true);
                      }}
                      value={displayName}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label>Tagline</label>
                    <textarea
                      cols="30"
                      placeholder="Describe yourself in a nutshell"
                      className="tagline"
                      value={tagline}
                      maxLength={200}
                      onChange={(e) => {
                        setTagline(e.target.value), setButtonSave(true);
                      }}
                    ></textarea>
                    <span className="length">{tagline?.length}/200</span>
                  </div>
                </div>
                <div className="form-file">
                  <label htmlFor="input_file">
                    <span>Add an image</span>
                    <div>
                      {preview ? (
                        <img src={preview} alt="" />
                      ) : userData?.picture.image ? (
                        <img src={userData?.picture.image} />
                      ) : (
                        <AddAPhoto className="addPhoto" />
                      )}
                      <h3>Profile photo</h3>
                    </div>
                  </label>

                  <input
                    className="file"
                    id="input_file"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImage}
                  />
                </div>
              </div>
            </>
          )}
        </DynamicForm>
      </>
    </Form>
  );
};

const DynamicForm = styled.div`
  width: 100%;
  height: 100%;
  margin: 22px 0;
  font-size: 20px;
  border: 1px solid var(--input-border-color);

  h3 {
    margin: 20px 0;
    font-size: 24px;
  }

  .head-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    user-select: none;

    svg {
      transition: all 0.2s 0s ease-in-out;
    }

    .click {
      transform: rotate(180deg);
    }
  }

  .input-container {
    padding: 1rem 2rem;
    border-top: 1px solid var(--input-border-color);
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .form-file {
      input {
        display: none;
      }

      h3 {
        font-size: 18px;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 270px;
        margin-top: 10px;
        cursor: pointer;

        &:focus,
        &:active {
          border: 3px solid var(--blue-color);
        }

        svg {
          /* display: block; */
          border: 2px solid var(--red-color);
          border-radius: 50%;
          width: 120px;
          height: 120px;
          padding: 30px;
          color: var(--red-color);
          margin-bottom: 10px;
          overflow: visible;
        }

        img {
          display: block;
          border-radius: 50%;
          height: 120px;
          width: 120px;
          margin-bottom: 5px;
          border: 2px solid var(--red-color);
        }
      }
    }

    .form-file {
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .form-control {
      width: 65%;

      .input-wrapper {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        font-size: 22px;

        .tagline {
          font-size: 14px;
          padding: 15px;
          height: 150px;
        }

        .length {
          color: var(--grey-color);
          margin: 6px 0;
          font-size: 12px;
        }
      }
    }

    .form-file {
      width: 32%;
      margin: 20px 0 0 0;
      max-height: 300px;
    }

    label {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 14px;
    }

    span {
      margin: 50px 0;
    }

    input {
      width: 100%;
      height: 40px;
      padding: 0 10px;
      font-size: 14px;
    }
  }
`;

const Form = styled.form`
  .public-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-weight: bold;
      letter-spacing: -0.9px;
      font-size: 38px;
    }

    .btn-save {
      position: relative;
      width: 200px;
      height: 60px;
      font-size: 12px;
      font-weight: bold;
      color: white;
      background-color: #d9d9d9;
      display: block;
      border: none;
      border-radius: 3px;
      letter-spacing: 1.2px;

      .scaled-loading {
        transform: scale(0.8) !important;
      }
    }

    .selected {
      background-color: var(--red-color);
    }

    .highlight {
      background-color: var(--red-color);
      cursor: pointer;

      &:active,
      &:focus {
        outline: 2px solid var(--blue-color);
        border-radius: 3px;
        outline-offset: 1px;
      }
    }
  }
`;

export default PublicInfo;
