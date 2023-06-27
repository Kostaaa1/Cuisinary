import { Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const FullImageModal = ({ closeModal, imageUrl }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (imageRef.current && !imageRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <Modal
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="image-wrap" ref={imageRef}>
        <img src={imageUrl} alt="personal-recipe-image" />
        <span className="close">
          <Close onClick={closeModal} />
        </span>
      </div>
    </Modal>
  );
};

const Modal = styled(motion.div)`
  position: fixed;
  overflow: none;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(22, 22, 22, 0.75);
  z-index: 10000;

  .image-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-height: 880px;
    transform: scale(0.9);

    img {
      height: 100%;
    }

    .close {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      right: 0;
      /* transform: translate(-50%, -50%); */

      svg {
        color: #fff !important;
        cursor: pointer;
        color: var(--main-color);
        font-size: 2.2rem;
      }
    }
  }
`;

export default FullImageModal;
