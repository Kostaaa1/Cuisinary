import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../../../../common/Button";
import { Close, Lock, Add } from "@material-ui/icons";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../setup/auth/useAuth";
import { useLayoutData } from "../../hooks/useLayoutData";
import { useAuth0 } from "@auth0/auth0-react";

const AddCustomModal = ({ showModal, favorite }) => {
  const [collName, setCollName] = useState("");
  const [checkedColls, setCheckedColls] = useState([]);
  // const { user } = useAuth();
  const { layoutData, setLayoutData } = useLayoutData();
  const [showInput, setShowInput] = useState(false);
  const [recipeNames, setRecipeNames] = useState([]);
  const { user } = useAuth0();

  const handle = (e) => {
    if (e.key !== "Escape") return;
    showModal();
  };

  useEffect(() => {
    document.addEventListener("keydown", handle);
  }, []);

  const addNewCollection = async (e) => {
    try {
      e.preventDefault();

      axios.post(`/api/user/${user?.email}/addCollection`, {
        collName: collName,
      });

      setRecipeNames([{ collName: collName }, ...recipeNames]);
      setShowInput(false);
      setCollName("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRecipeNames(layoutData);
  }, [layoutData]);

  const handleCheckbox = (e, collName) => {
    if (e.currentTarget.checked) {
      setCheckedColls([...checkedColls, collName]);
    } else {
      setCheckedColls(checkedColls.filter((x) => x !== collName));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/api/user/${user.email}/addToCustom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collections: checkedColls,
          recipe: favorite,
        }),
      });
      showModal();
    } catch (error) {
      console.log(error);
    }
  };

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
              <Add />
              <h3>Add to Collection</h3>
            </div>
            <Close className="close" onClick={showModal} />
          </div>
          <div className="recipe-section">
            <img src={favorite.recipe.image} alt="" />
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
                      <h5>NEW COLLECTION</h5>
                    </div>
                    <div className="input-wrap">
                      <input
                        className="add"
                        type="text"
                        placeholder="Collection Name"
                        value={collName ? collName : ""}
                        onChange={(e) => setCollName(e.target.value)}
                      />
                      <button onClick={addNewCollection}>Add</button>
                    </div>
                  </div>
                ) : (
                  <div className="add-collection" onClick={() => setShowInput(true)}>
                    <Add />
                    <h5>NEW COLLECTION</h5>
                  </div>
                )}
                {recipeNames
                  ?.filter((coll) => coll.collName !== "All saved items")
                  .map((coll, id) => (
                    <div key={id} className="input-wrap">
                      <label>
                        <input type="checkbox" className="check" onChange={(e) => handleCheckbox(e, coll.collName)} />
                        {coll.collName ? coll.collName : ""}
                      </label>
                    </div>
                  ))}
                {!showInput && (
                  <div className="buttons">
                    {checkedColls.length !== 0 ? <span>Uncheck All</span> : <div></div>}

                    <input className="submit" type="submit" value={"Done"} />
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
  background-color: rgba(22, 22, 22, 0.6);
  z-index: 10000;
  flex-wrap: wrap;
`;

const Section = styled.div`
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

            h5 {
              cursor: pointer;

              &:hover {
                text-decoration: underline;
                text-decoration-color: var(--red-color);
                text-underline-offset: 3px;
                text-decoration-thickness: 11%;
              }
            }
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

          .add-collection {
            display: flex;
            align-items: center;
            cursor: pointer;
            width: max-content;
            margin-bottom: 14px;

            svg {
              font-size: 1.4rem;
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

          .input-wrap {
            display: flex;
            align-items: center;
            overflow: auto;

            label {
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }

            input:not(.add) {
              margin: 10px 0;
              margin-right: 10px;
            }

            .check {
              width: 20px;
              height: 20px;
            }

            .check:checked {
              background-color: red;
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
            border-radius: 5px;
            letter-spacing: 1.1px;
            background-color: #ce4620;

            &:active {
              outline: 2px solid #003e9b;
              border-radius: 5px;
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
        width: 60px;
        height: 60px;
      }

      span {
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
      background-color: #ce4620;

      .header-flex {
        display: flex;
        align-items: center;
        height: 100%;

        h3 {
          margin: 0;
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
