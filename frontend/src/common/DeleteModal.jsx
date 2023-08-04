import styled from 'styled-components';
import { Close, Delete } from '@mui/icons-material';
import Button from './Button';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const DeleteModal = ({ text, message, type, name, onClick, closeModal }) => {
  useEffect(() => {
    const handle = (e) => {
      if (e.key !== 'Escape') return;
      closeModal();
    };

    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('keydown', handle);
    };
  }, []);

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
            <Delete />
            <h4>{text}</h4>
          </span>
          <Close className="cross" onClick={closeModal} />
        </div>
        <div className="content">
          <p>
            {message} <span> {` ${name} `} </span> {type}?
          </p>
          <div className="buttons-wrap">
            <button className="btn-border" onClick={closeModal}>
              Cancel
            </button>
            <Button
              value={'Delete'}
              onClick={onClick}
              style={{ width: '120px', height: '50px' }}
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
  content: '';
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

    h4 {
      color: #fff;
      font-weight: bold;
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
        letter-spacing: 1px;
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

export default DeleteModal;
