import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "./Button";
import { Close, Lock, Add } from "@material-ui/icons";
import { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const CollectionModal = ({ showModal, collectionTitle, isPrivate }) => {
  const params = useParams();
  const [collName, setCollName] = useState("");
  const [collDesc, setCollDesc] = useState("");
  const [collPrivate, setCollPrivate] = useState(isPrivate ? isPrivate : false);
  const { user } = useAuth0();

  const submitCollection = (e) => {
    e.preventDefault();

    const collectionData = {
      collName,
      collDesc,
    };

    const filteredObject = Object.entries(collectionData)
      .filter(([key, value]) => value)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    axios.post(
      params.id ? `/api/user/${user?.email}/${params.id}/editCollection` : `/api/user/${user?.email}/newCollection`,
      { ...filteredObject, private: collPrivate }
    );

    showModal();
    window.location.reload();
  };
  const handle = (e) => {
    if (e.key !== "Escape") return;
    showModal();
  };

  useEffect(() => {
    document.addEventListener("keydown", handle);
  }, []);

  return (
    <Modal
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
                type="text"
                placeholder={params.id ? collectionTitle : "Give your collection a name"}
                onChange={(e) => setCollName(e.target.value)}
              />
            </div>
            <div>
              <label>Description (optional)</label>
              <textarea
                cols="30"
                rows="6"
                id="tagline"
                type="text"
                maxLength="300"
                placeholder="Describe your collection"
                onChange={(e) => setCollDesc(e.target.value)}
              />
              <span>{collDesc.length}/300 characters</span>
            </div>
            <div className="checkbox">
              <div>
                <label>
                  Private Collection
                  <Lock />
                </label>
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
              <Button type={"submit"} value={"Create Collection"} />
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
      background-color: #ce4620;

      .header-flex {
        display: flex;
        align-items: center;

        .add-svg {
          margin-right: 8px;
        }

        h3 {
          font-weight: 600;
          margin: 0;
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

      input {
        width: 100%;
        height: 50px;
        padding: 0 10px;
        font-size: 14px;
      }

      textarea {
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

      div {
        display: flex;
        flex-direction: row-reverse;
        justify-content: start;
        align-items: center;

        label {
          margin: 0;
          display: flex;
          font-weight: 500;

          svg {
            margin-left: 5px;
            font-size: 16px;
          }
        }
      }

      span {
        font-size: 12px;
      }

      .check {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border-radius: 5px;
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
        color: #ce4620;
        text-decoration: underline;
        cursor: pointer;
        margin-right: 15px;
      }
    }
  }
`;

export default CollectionModal;
