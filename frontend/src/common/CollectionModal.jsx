import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';
import { Close, HttpsOutlined, Add } from '@mui/icons-material';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import useNoScroll from '../utils/useNoScroll';
import { useQueryClient } from '@tanstack/react-query';

const CollectionModal = ({ showModal, collectionTitle, collectionDesc, isPrivate }) => {
  const params = useParams();
  const [collName, setCollName] = useState(collectionTitle || '');
  const [collDesc, setCollDesc] = useState(collectionDesc || '');
  const [collPrivate, setCollPrivate] = useState(isPrivate ? isPrivate : false);
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  useNoScroll(showModal);

  const queryClient = useQueryClient();

  const submitCollection = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const collectionData = {
        collName,
        collDesc,
      };

      await axios.post(
        params.id
          ? `/api/user/${user?.email}/${params.id}/editCollection`
          : `/api/user/${user?.email}/newCollection`,
        { ...collectionData, private: collPrivate }
      );

      await queryClient.refetchQueries(['user-data', user?.email]);
      showModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handle = (e) => {
      if (e.key !== 'Escape') return;
      showModal();
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
        style={{ display: showModal }}
      >
        <div className="new-collection">
          <div className="collection-header">
            <div className="header-flex">
              <Add />
              <h3>{params.id ? 'Edit Collection' : 'New Collection'}</h3>
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
                placeholder={'Give your collection a name'}
              />
              <span className="span-length">{collName.length}/40 characters</span>
            </div>
            <div>
              <label>Description (optional)</label>
              <textarea
                cols="30"
                rows="6"
                id="tagline"
                type="text"
                placeholder={!collDesc ? 'Add description' : undefined}
                maxLength="300"
                value={collDesc}
                onChange={(e) => setCollDesc(e.target.value)}
              />
              <span className="span-length">{collDesc.length}/300 characters</span>
            </div>
            <div className="checkbox">
              <div className="wrap-check">
                <input
                  class="styled-checkbox check"
                  id="styled-checkbox"
                  type="checkbox"
                  checked={collPrivate}
                  onChange={(e) => setCollPrivate(e.currentTarget.checked)}
                />
                <label htmlFor="styled-checkbox" className="checkbox-label">
                  Private Collection <HttpsOutlined />
                </label>
              </div>
              <span>Only you can see a private collection</span>
            </div>
            <div className="button">
              <p onClick={showModal}>Cancel</p>
              <Button
                type={'submit'}
                value={params.id ? 'Edit Collection' : 'Create Collection'}
                style={{ width: '180px', height: '50px', fontSize: '14px' }}
                isLoading={isLoading}
              />
            </div>
          </form>
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(22, 22, 22, 0.75);
  z-index: 10000;
  flex-wrap: wrap;
`;

const Section = styled(motion.div)`
  background-color: white;
  width: 360px;
  height: 560px;
  color: var(--main-color);
  position: relative;

  .new-collection {
    display: flex;
    flex-direction: column;

    .collection-header {
      padding: 0 12px;
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
      }

      input[type]:not([type='checkbox']) {
        width: 100%;
        height: 50px;
        padding: 0 10px;
        font-size: 14px;
        margin-top: 10px;
      }

      textarea {
        margin-top: 10px;
        resize: none;
        padding: 15px 10px;
        font-size: 14px;
      }

      .span-length {
        font-weight: 300;
        font-size: 11px !important;
        margin-top: 4px;
      }
    }

    .checkbox {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      span {
        font-weight: 300;
        font-size: 12px;
        margin-bottom: 24px;
      }

      .wrap-check {
        width: max-content;
        height: max-content;
        user-select: none;

        label {
          display: inline-flex;
          align-items: center;

          svg {
            margin-left: 4px;
            font-size: 16px;
            color: var(--grey-color);
          }
        }
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
