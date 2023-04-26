import { Check, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SavedModal = ({ setFavorite }) => {
  const close = () => {
    setFavorite(false);
  };

  const handle = (e) => {
    if (e.key !== "Escape") return;
    close();
  };

  useEffect(() => {
    document.addEventListener("keydown", handle);
  }, []);

  const click = (e) => {
    if (
      e.target.className === "saved" ||
      e.target.className === "" ||
      e.target.tagName === "svg" ||
      e.target.tagName === "path"
    ) {
      null;
    } else {
      close();
    }
  };

  return (
    <Modal
      onClick={(e) => click(e)}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Section>
        <div className="close">
          <Close
            onClick={() => {
              close();
            }}
          />
        </div>
        <div className="saved">
          <Check className="" />
          <h1>Saved!</h1>
          <p>
            View <Link to={"/account/profile/collection"}>All Saved Items</Link>
          </p>
        </div>
      </Section>
    </Modal>
  );
};

const Modal = styled(motion.div)`
  position: fixed;
  overflow: hidden;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(22, 22, 22, 0.75);
  z-index: 10000 !important;
  flex-wrap: wrap;
`;

const Link = styled(NavLink)`
  text-decoration: underline;
  text-decoration-color: var(--red-color);
  text-underline-offset: 5px;
  text-decoration-thickness: 14%;
  color: black;
  font-size: 16px;
`;

const Section = styled.div`
  display: flex;
  justify-content: end;

  .close {
    position: absolute;
    margin: 10px;

    svg {
      cursor: pointer;
      color: var(--main-color);
      font-size: 2.2rem;
    }
  }
  .saved {
    width: 350px;
    height: 620px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    p {
      color: var(--main-color);
    }

    svg {
      background-color: green;
      border-radius: 50%;
      color: white;
      font-size: 2rem;
      transform: scale(2);
    }

    h1 {
      font-size: 36px;
      color: black;
      margin: 40px 20px 20px 20px;
    }
  }
`;

export default SavedModal;
