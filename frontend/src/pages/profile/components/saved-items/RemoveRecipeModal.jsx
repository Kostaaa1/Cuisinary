import styled from "styled-components";
import { Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import Button from "../../../../common/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RemoveModal = ({ title, onClick, remove }) => {
  const params = useParams();
  const [collection, setCollection] = useState("");

  useEffect(() => {
    params.name === "saved-items"
      ? setCollection("All Saved Items")
      : setCollection("Collection");

    const handle = (e) => {
      if (e.key !== "Escape") return;
      onClick();
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
    >
      <Section>
        <div className="modal-header">
          <h3>Remove from {collection}</h3>
          <Close onClick={onClick} />
        </div>
        <div className="content">
          <p>
            Are you sure? Removing <span> {title}</span> will permanently delete
            it from all collections.
          </p>
          <div className="buttons-wrap">
            <button className="btn-border" onClick={onClick}>
              Cancel
            </button>
            <Button
              value={"Remove"}
              onClick={() => {
                remove();
                onClick();
              }}
              style={{ width: "120px", height: "50px" }}
            />
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
  min-height: 260px;

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    color: white;
    background-color: var(--red-color);
    padding: 0 20px;

    h3 {
      color: #fff;
      font-weight: bold;
    }

    svg {
      cursor: pointer;
    }
  }

  .content {
    padding: 20px;
    padding-top: 10px;

    p {
      margin: 25px 0;
      line-height: 1.6rem;
      letter-spacing: 0.8px;
    }

    p > span {
      font-weight: bold;
      font-size: 16px;
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

        &:active {
          outline: 2px solid var(--blue-color);
          outline-offset: 1px;
        }

        &:hover {
          background-color: var(--red-color);
          color: white;
        }
      }
    }
  }
`;

export default RemoveModal;
