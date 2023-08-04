import styled from 'styled-components';
import {
  ArrowBack,
  Delete,
  Edit,
  HttpsOutlined,
  SupervisorAccount,
} from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import CollectionCard from './CollectionCard';
import TransparentCard from './TransparentCard';
import Button from '../../../../common/Button';
import ButtonHover from '../../../../common/ButtonHover';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileContext from '../../../../setup/app-context-menager/GlobalContext';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import CollectionModal from '../../../../common/CollectionModal';
import useNoScroll from '../../../../utils/useNoScroll';
import { useWindowSize } from '../../../../utils/useWindowSize';
import DeleteModal from '../../../../common/DeleteModal';
import { ToastContainer } from 'react-toastify';

const SavedItems = () => {
  const params = useParams();
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] = useState(false);
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [collectionArray, setCollectionArray] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const { arrayOfRecipeIds, setArrayOfRecipeIds, setCollectionId, setCollectionParams } =
    useContext(ProfileContext);
  useNoScroll(showDeleteCollectionModal, showEditCollectionModal);

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user-data', user?.email]);
  const windowSize = useWindowSize();

  useEffect(() => {
    const collection = userData?.collections.find((coll) =>
      params.id ? coll._id === params.id : coll
    );

    if (collection) {
      const collectionArr = collection.collRecipes.map(
        (item) => item && { ...item, loading: false }
      );

      setCollectionArray(collectionArr);
      setCollectionData(collection);
    }
  }, [userData]);

  const addRecipeId = (id) => {
    const arr = [...arrayOfRecipeIds, id];
    setArrayOfRecipeIds(arr);
  };

  const removeRecipeId = (id) => {
    const arr = arrayOfRecipeIds.filter((index) => index !== id);
    setArrayOfRecipeIds(arr);
  };

  useEffect(() => {
    setCollectionParams(params.name);
    if (params.id) {
      setCollectionId(params.id);
    }
  }, [params]);

  const addLoading = (index) => {
    setCollectionArray((prevState) =>
      prevState.map((recipe, i) => (i === index ? { ...recipe, loading: true } : recipe))
    );

    setTimeout(() => {
      setCollectionArray((prevState) =>
        prevState.map((recipe, i) =>
          i === index ? { ...recipe, loading: false } : recipe
        )
      );
    }, Math.random() * 1200);
  };

  const deleteCollection = async () => {
    await axios.post(`/api/user/${user.email}/${params.id}/deleteCollection`, {
      id: params.id,
      email: user.email,
    });
    navigate('/account/profile/collection');
  };

  return (
    <Saved>
      <>
        <div className="wrap">
          {windowSize[0] > 1030 ? (
            <ButtonHover
              value={'BACK TO ALL'}
              icon={<ArrowBack />}
              onClick={() => {
                navigate('/account/profile/collection');
              }}
            />
          ) : (
            <div></div>
          )}
          {params.name === 'collection' && params.id && (
            <div className="wrap-flex">
              <ButtonHover
                value={'DELETE'}
                icon={<Delete />}
                onClick={() => setShowDeleteCollectionModal(true)}
              />
              <ButtonHover
                value={'EDIT'}
                icon={<Edit />}
                onClick={() => setShowEditCollectionModal(true)}
              />
            </div>
          )}
        </div>
        <div className="section-info">
          {collectionData?.collName === 'All Saved Items' ? (
            <>
              <h1>{collectionData?.collName}</h1>
              <div className="height-div">
                <h4>All your favorite content in one place!</h4>
                <p>
                  <span>
                    <SupervisorAccount />
                    Other users see what you save
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <h1>{collectionData?.collName}</h1>
              <div className="height-div">
                {collectionData?.collDesc && <h3>{collectionData?.collDesc}</h3>}
                <p>
                  <span>
                    {collectionData?.private ? (
                      <>
                        <HttpsOutlined />
                        Private Collection by&nbsp;
                      </>
                    ) : (
                      <>
                        <SupervisorAccount />
                        Public Collection by&nbsp;
                      </>
                    )}
                    <span className="nickname"> {userData?.nickname} </span>
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
        {collectionData?.collRecipes?.length === 0 && (
          <section>
            <h2>You haven't saved anything yet. Start browsing!</h2>
            <p>
              You can save items to your profile by clicking the heart icon in the share
              bar.
            </p>
            <Button
              value={'BACK HOME'}
              onClick={() => navigate('/account/profile/collection')}
              style={{ width: '150px', height: '50px' }}
            />
          </section>
        )}
        {collectionArray.length > 0 && (
          <h4 className="length">{collectionArray.length} items</h4>
        )}
        <div className="collection-control">
          {collectionArray.map((favorite, id) =>
            arrayOfRecipeIds.includes(favorite?._id) && !favorite.loading ? (
              <TransparentCard
                key={id}
                favorite={favorite}
                removeRecipeId={removeRecipeId}
                addLoading={() => addLoading(id)}
              />
            ) : (
              <CollectionCard
                key={id}
                addLoading={() => addLoading(id)}
                favorite={favorite}
                addRecipeId={addRecipeId}
              />
            )
          )}
        </div>
        {showDeleteCollectionModal && (
          <DeleteModal
            text="Delete Collection"
            message={`Are you sure you want to delete `}
            onClick={deleteCollection}
            closeModal={() => setShowDeleteCollectionModal(false)}
            type="collection"
            name={collectionData?.collName}
          />
        )}
        {showEditCollectionModal && (
          <CollectionModal
            showModal={() => setShowEditCollectionModal(false)}
            collectionTitle={collectionData?.collName}
            collectionDesc={collectionData?.collDesc}
            isPrivate={collectionData?.private}
          />
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    </Saved>
  );
};

const Saved = styled.div`
  width: 100%;

  h3 {
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
  }

  .wrap {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    justify-content: space-between;

    @media screen and (max-width: 709px) {
      justify-content: center;
    }

    .wrap-flex {
      width: 180px;
      display: flex;
      justify-content: space-between;
    }
  }

  section {
    margin: 32px 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      text-align: center;
      word-break: keep-all;
      font-size: 24px !important;
      color: var(--grey-color);
    }

    p {
      margin: 26px 0;
    }
  }

  .section-info {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    min-height: 170px;
    padding: 30px 0;
    margin: 10px 0 20px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.16);
    border-bottom: 1px solid rgba(0, 0, 0, 0.16);

    h1 {
      font-size: 36px !important;
      margin-bottom: 18px;

      @media screen and (max-width: 709px) {
        font-size: 30px !important;
      }
    }

    .height-div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 70px;

      h4 {
        font-weight: 400;
        margin: 14px 0;
      }

      svg {
        margin-right: 6px;
      }

      span {
        font-weight: 300;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;

        .nickname {
          font-weight: 600;
        }

        h4 {
          font-size: 16px;
        }
      }
    }

    p {
      margin: 4px 0 0 0;
    }

    h1 {
      color: var(--main-color);
    }
  }

  .length {
    font-weight: 500;
    margin: 20px 0;
  }

  .collection-control {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    row-gap: 40px;

    @media screen and (max-width: 709px) {
      flex-direction: column;
    }
  }
`;

export default SavedItems;
