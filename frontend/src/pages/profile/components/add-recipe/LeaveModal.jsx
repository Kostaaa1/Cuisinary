import { Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import Button from "../../../../common/Button";
import { useNavigate } from "react-router-dom";

const LeaveModal = ({ setShowLeaveModal }) => {
  const navigate = useNavigate();

  return (
    <Modal>
      <Section
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-header">
          <span className="flex-header">
            <h3>Leave Confirmation</h3>
          </span>
          <Close onClick={() => setShowLeaveModal(false)} className="cross" />
        </div>
        <div className="content">
          <p>
            Are you sure you want to leave this page? Your changes will be lost
            if you go back.
          </p>
          <div className="buttons-wrap">
            <button
              className="btn-border"
              onClick={() => setShowLeaveModal(false)}
            >
              Cancel
            </button>
            <Button
              value={"Leave"}
              style={{ width: "120px", height: "50px" }}
              onClick={() => navigate("/account/profile/recipes")}
            />
          </div>
        </div>
      </Section>
    </Modal>
  );
};

const Modal = styled.div`
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

const Section = styled(motion.div)`
  background-color: white;
  width: 360px;

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
      letter-spacing: 0.6px;
    }

    p > span {
      font-size: 18px;
      font-weight: bold;
      word-break: keep-all;
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

export default LeaveModal;
