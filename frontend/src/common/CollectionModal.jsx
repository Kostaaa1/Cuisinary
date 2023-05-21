import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "./Button";
import { Close, HttpsOutlined, Add } from "@mui/icons-material";
import { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const CollectionModal = ({
  showModal,
  collectionTitle,
  collectionDesc,
  isPrivate,
}) => {
  const params = useParams();
  const [collName, setCollName] = useState(
    collectionTitle ? collectionTitle : ""
  );
  const [collDesc, setCollDesc] = useState(
    collectionDesc ? collectionDesc : ""
  );
  const [collPrivate, setCollPrivate] = useState(isPrivate ? isPrivate : false);
  const { user } = useAuth0();

  const submitCollection = async (e) => {
    e.preventDefault();
    try {
      const collectionData = {
        collName,
        collDesc,
      };

      // const filteredObject = Object.entries(collectionData)
      //   .filter(([key, value]) => value)
      //   .reduce((obj, [key, value]) => {
      //     obj[key] = value;
      //     return obj;
      //   }, {});

      await axios.post(
        params.id
          ? `/api/user/${user?.email}/${params.id}/editCollection`
          : `/api/user/${user?.email}/newCollection`,
        { ...collectionData, private: collPrivate }
      );

      showModal();
      window.location.reload();
    } catch (error) {}
  };

  useEffect(() => {
    const handle = (e) => {
      if (e.key !== "Escape") return;
      showModal();
    };
    document.addEventListener("keydown", handle);

    return () => {
      document.removeEventListener("keydown", handle);
    };
  }, []);

  return (
    <Modal
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ display: showModal }}
    >
      <Section>
        <div className="new-collection">
          <div className="collection-header">
            <div className="header-flex">
              <Add className="add-svg" />
              <h3>{params.id ? "Edit Collection" : "New Collection"}</h3>
            </div>
            <Close className="close" onClick={showModal} />
          </div>
          <form onSubmit={submitCollection}>
            <div>
              <label>Collection Name</label>
              <input
                required
                maxLength={40}
                type="text"
                value={collName}
                onChange={(e) => setCollName(e.target.value)}
                placeholder={"Give your collection a name"}
              />
              <span className="ta-length">{collName.length}/40 characters</span>
            </div>
            <div>
              <label>Description (optional)</label>
              <textarea
                cols="30"
                rows="6"
                id="tagline"
                type="text"
                placeholder={!collDesc && "Add description"}
                maxLength="300"
                value={collDesc}
                onChange={(e) => setCollDesc(e.target.value)}
              />
              <span className="ta-length">
                {collDesc.length}/300 characters
              </span>
            </div>
            <div className="checkbox">
              <div className="wrap">
                <p>
                  Private Collection
                  <HttpsOutlined />
                </p>
                <input
                  type="checkbox"
                  checked={collPrivate}
                  className="check"
                  onChange={(e) => setCollPrivate(e.currentTarget.checked)}
                />
              </div>
              <span>Only you can see a private collection</span>
            </div>
            <div className="button">
              <p onClick={showModal}>Cancel</p>
              <Button
                type={"submit"}
                value={params.id ? "Edit Collection" : "Create Collection"}
                style={{ width: "180px", height: "50px", fontSize: "14px" }}
              />
            </div>
          </form>
        </div>
      </Section>
    </Modal>
  );
};

const Modal = styled(motion.div)`
  position: fixed;
  overflow: none;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(22, 22, 22, 0.75);
  z-index: 10000;
  flex-wrap: wrap;
`;

const Section = styled.div`
  background-color: white;
  width: 360px;
  height: 560px;
  color: var(--main-color);
  position: relative;

  .new-collection {
    display: flex;
    flex-direction: column;

    .collection-header {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      color: white;
      background-color: var(--red-color);

      .header-flex {
        display: flex;
        align-items: center;

        .add-svg {
          margin-right: 4px;
        }

        h3 {
          font-weight: 600;
          margin: 0;
          color: white;
        }
      }

      .close {
        cursor: pointer;
      }
    }

    form > div {
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      margin: 30px 0;
      font-size: 14px;

      label {
        font-weight: 600;
        margin-bottom: 10px;
      }

      .ta-length {
        font-weight: 400;
        font-size: 12px;
      }

      input {
        width: 100%;
        height: 50px;
        padding: 0 10px;
        font-size: 14px;
      }

      textarea {
        resize: none;
        padding: 15px 10px;
        font-size: 14px;
      }

      span {
        font-size: 10px;
        font-weight: 200;
        margin-top: 5px;
      }
    }
    .checkbox {
      display: flex;

      .wrap {
        display: flex;
        flex-direction: row-reverse;
        justify-content: start;
        align-content: center;
        text-align: center;
        font-size: 14px;

        svg {
          color: var(--grey-color);
          transform: scale(1.4);
          font-size: 14px;
          margin-left: 6px;
        }

        label {
          margin: 0;
          display: flex;
          font-weight: bold;
        }
      }

      span {
        font-weight: 400;
        font-size: 12px;
      }

      .check {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border-radius: 3px;
        cursor: pointer;
      }
    }

    .button {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-end;

      p {
        color: var(--red-color);
        text-decoration: underline;
        cursor: pointer;
        font-size: 14px;
        margin-right: 16px;
      }
    }
  }
`;

export default CollectionModal;
