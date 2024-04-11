import styled from 'styled-components';
import { useState } from 'react';
import { Close, Add } from '@mui/icons-material';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';

const AddCustomModal = ({ showModal, favorite }) => {
  const [collName, setCollName] = useState('');
  const [checkedColls, setCheckedColls] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const { user } = useAuth0();
  const queryClient = useQueryClient();
  const [collections, setCollections] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const userData = queryClient.getQueryData(['user-data', user?.email]);

  useEffect(() => {
    if (userData) {
      let collections = userData.collections.filter(
        (x) => x.collName !== 'All Saved Items'
      );
      setUserCollections(collections);
    }
  }, [userData]);

  useEffect(() => {
    setCollections(userCollections);
    setCheckedColls(
      userCollections.map((coll) =>
        coll.collRecipes
          .map(({ recipeTitle }) =>
            recipeTitle === favorite.recipeTitle ? coll.collName : undefined
          )
          .find((coll) => coll)
      )
    );
  }, [userCollections]);

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

  const addNewCollection = async (e) => {
    try {
      e.preventDefault();

      axios.post(`/api/user/${user?.email}/newCollection`, {
        collName: collName,
      });

      setCollections((prevState) => [{ collName, collRecipes: [] }, ...prevState]);

      setShowInput(false);
      setCollName('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (e, collName, id) => {
    if (e.currentTarget.checked) {
      setCheckedColls((prevState) => prevState.map((x, i) => (i === id ? collName : x)));
    } else {
      setCheckedColls((prevState) => prevState.map((x, i) => (i === id ? undefined : x)));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const checkedCollWithRecipe = userCollections
        .filter(({ collName }, i) => collName === checkedColls[i])
        .map((coll) =>
          coll.collRecipes.some(({ recipeTitle }) => recipeTitle === favorite.recipeTitle)
            ? false
            : coll._id
        )
        .filter((coll) => coll);

      await toast.promise(
        axios.post(`/api/user/${user.email}/addToCustom`, {
          collectionIds: checkedCollWithRecipe,
          recipeId: favorite._id,
        }),
        {
          pending: 'Saving recipe...',
          success: `Recipe saved to collection ${userCollections
            .map((coll) =>
              checkedCollWithRecipe.includes(coll.collName) ? coll.collName : null
            )
            .filter((coll) => coll)}!`,
          error: 'An error occurred while saving the recipe!',
        }
      );

      showModal();
    } catch (error) {
      console.log(error);
    }
  };

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
              <h3>Add to Collection</h3>
            </div>
            <Close className="close" onClick={showModal} />
          </div>
          <div className="recipe-section">
            <img src={favorite.data.image} alt="" />
            <p>
              Select collection(s) for <span>{favorite.recipeTitle}.</span>
            </p>
          </div>
          <div className="main-section">
            <div className="main-header">
              <h2>Your Collections</h2>
            </div>
            <div className="main-form-div">
              <form onSubmit={submitForm}>
                {showInput ? (
                  <div className="show-input">
                    <div className="flex" onClick={() => setShowInput(false)}>
                      <Close />
                      <h6>NEW COLLECTION</h6>
                    </div>
                    <div className="input-wrap">
                      <input
                        className="add"
                        type="text"
                        placeholder="Collection Name"
                        value={collName ? collName : ''}
                        onChange={(e) => setCollName(e.target.value)}
                      />
                      <button onClick={addNewCollection}>Add</button>
                    </div>
                  </div>
                ) : (
                  <div className="add-collection" onClick={() => setShowInput(true)}>
                    <Add />
                    <h6>NEW COLLECTION</h6>
                  </div>
                )}
                {collections.map((coll, id) => (
                  <div key={coll._id} className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={checkedColls[id]}
                      onChange={(e) => handleCheckbox(e, coll.collName, id)}
                      className="styled-checkbox check"
                      id={`styled-checkbox-${id}`}
                    />
                    <label htmlFor={`styled-checkbox-${id}`}>
                      {coll.collName ? coll.collName : ''}
                    </label>
                  </div>
                ))}
                {!showInput && (
                  <div className="buttons">
                    <div></div>
                    <input className="submit" type="submit" value={'Done'} />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </Section>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  overflow: hidden;
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
  width: 350px;
  height: 600px;
  position: relative;

  .new-collection {
    display: flex;
    flex-direction: column;

    .main-section {
      padding: 10px 12px;
      position: relative;

      .main-header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        outline: 1px solid rgba(0, 0, 0, 0.2);

        h2 {
          font-size: 18px;
        }
      }

      h6 {
        cursor: pointer;
        color: var(--grey-color);
        letter-spacing: 0 !important;

        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--red-color);
          text-underline-offset: 3px;
          text-decoration-thickness: 11%;
        }
      }

      .main-form-div {
        outline: 1px solid rgba(0, 0, 0, 0.2);
        height: 340px;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .show-input {
          margin-bottom: 20px;

          .flex {
            display: flex;
            align-items: center;
            width: max-content;
            margin-bottom: 5px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            svg {
              cursor: pointer;
              font-size: 1.4rem;
              margin-right: 4px;
            }
          }

          input {
            height: 45px;
            width: 80%;
            padding: 10px;
          }

          button {
            width: 20%;
            height: 80%;
            font-weight: 500;
            color: white;
            cursor: pointer;
            background-color: var(--red-color);
            border: none;
            height: 45px;
          }
        }

        form {
          overflow: auto;
          height: 250px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;

          .add-collection {
            display: flex;
            align-items: center;
            cursor: pointer;
            width: max-content;
            margin-bottom: 14px;

            svg {
              font-size: 1.4rem;
              color: var(--grey-color);
              margin-right: 4px;
            }

            h5 {
              &:hover {
                text-decoration: underline;
                text-decoration-color: var(--red-color);
                text-underline-offset: 3px;
                text-decoration-thickness: 11%;
              }
            }
          }

          .checkbox-wrap {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 8px 0;

            label {
              font-size: 16px;
            }
          }

          .input-wrap {
            display: flex;
            align-items: center;
            overflow: auto;

            input[type='text'] {
              &:focus {
                outline: none;
              }
            }
          }
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 20px;
          width: 100%;

          .submit {
            padding: 18px 35px;
            font-weight: bold;
            color: white;
            cursor: pointer;
            display: block;
            border: none;
            font-size: 12px;
            border-radius: 3px;
            letter-spacing: 1.1px;
            background-color: var(--red-color);

            &:active {
              outline: 2px solid var(--blue-color);
              border-radius: 3px;
              outline-offset: 1px;
              width: fit-content;
            }
          }

          span {
            font-size: 14px;
          }
        }
      }
    }

    .recipe-section {
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      word-wrap: break-word;
      font-size: 15px;

      img {
        width: 70px;
        height: 70px;
      }

      span {
        font-size: 16px;
        font-weight: 600;
      }
    }

    .collection-header {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      color: white;
      background-color: var(--red-color);

      .header-flex {
        display: flex;
        align-items: center;
        height: 100%;

        h3 {
          margin: 0;
          color: white;
          font-weight: 600;
        }
      }

      .close {
        cursor: pointer;
      }
    }
  }
`;

export default AddCustomModal;
