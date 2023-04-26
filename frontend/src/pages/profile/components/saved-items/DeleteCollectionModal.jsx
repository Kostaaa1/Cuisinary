import styled from "styled-components";
import { Close, Delete, Lock } from "@mui/icons-material";
import { motion } from "framer-motion";
import Button from "../../../../common/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const RemoveModal = ({ collectionTitle, onClick }) => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const params = useParams();

  const handle = (e) => {
    if (e.key !== "Escape") return;
    onClick();
  };

  useEffect(() => {
    document.addEventListener("keydown", handle);
  }, []);

  const deleteCollection = () => {
    fetch(`/api/user/${user.email}/${params.id}/deleteCollection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        email: user.email,
      }),
    });

    navigate("/account/profile/collection");
  };

  return (
    <Modal animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Section>
        <div className="modal-header">
          <span className="flex-header">
            <Delete />
            <h3>Delete Collection</h3>
          </span>
          <Close className="cross" onClick={onClick} />
        </div>
        <div className="content">
          <p>
            Are you sure you want to delete your <span> {collectionTitle} </span> collection?
          </p>
          <div className="buttons-wrap">
            <button className="btn-border" onClick={onClick}>
              Cancel
            </button>
            <Button value={"Delete"} onClick={deleteCollection} style={{ width: "120px", height: "50px" }} />
          </div>
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
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(22, 22, 22, 0.75);
  z-index: 10000;
`;

const Section = styled.div`
  background-color: white;
  width: 380px;

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 16px;
    color: white;
    background-color: var(--red-color);
    width: 100%;

    .cross {
      cursor: pointer;
    }

    .flex-header {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      color: #fff;
      font-weight: bold;
      margin: 0;
      margin-left: 10px;
    }

    svg {
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    height: 190px;
    background-color: white;
    justify-content: space-around;
    padding: 8px 16px;

    p {
      line-height: 1.6rem;
      letter-spacing: 0.8px;
      word-wrap: break-word;
    }

    p > span {
      font-size: 18px;
      font-weight: bold;
    }

    .buttons-wrap {
      display: flex;
      align-items: center;
      justify-content: start;

      .btn-border {
        color: var(--main-color);
        text-decoration: none;
        width: 120px;
        height: 50px;
        outline: 2px solid var(--red-color);
        font-weight: bold;
        border-radius: 3px;
        display: block;
        text-align: center;
        align-items: center;
        font-size: 14px;
        letter-spacing: 1.1px;
        cursor: pointer;
        border: none;
        margin-right: 16px;

        &:hover {
          background-color: var(--red-color);
          color: white;
        }
      }
    }
  }
`;

export default RemoveModal;
