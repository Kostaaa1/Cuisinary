import styled from "styled-components";
import {
  ArrowBack,
  Delete,
  Edit,
  HttpsOutlined,
  SupervisorAccount,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import TransparentCard from "./TransparentCard";
import Button from "../../../../common/Button";
import ButtonHover from "../../../../common/ButtonHover";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../../../setup/app-context-menager/GlobalContext";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import CollectionModal from "../../../../common/CollectionModal";
import DeleteCollectionModal from "./DeleteCollectionModal";
import useNoScroll from "../../../../utils/useNoScroll";

const SavedItems = () => {
  const params = useParams();
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] =
    useState(false);
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [collectionArray, setCollectionArray] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const {
    arrayOfRecipeNames,
    setArrayOfRecipeNames,
    setCollectionId,
    setCollectionParams,
  } = useContext(GlobalContext);
  useNoScroll(showDeleteCollectionModal, showEditCollectionModal);

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["user-data", user?.email]);

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

  const addRecipeName = (recipeTitle) => {
    const arr = [...arrayOfRecipeNames, recipeTitle];
    setArrayOfRecipeNames(arr);
  };

  const removeRecipeName = (recipeTitle) => {
    const arr = arrayOfRecipeNames.filter((name) => name !== recipeTitle);
    setArrayOfRecipeNames(arr);
  };

  useEffect(() => {
    setCollectionParams(params.name);

    if (params.id) {
      setCollectionId(params.id);
    }
  }, [params]);

  const addLoading = (index) => {
    setCollectionArray((prevState) =>
      prevState.map((recipe, i) =>
        i === index ? { ...recipe, loading: true } : recipe
      )
    );

    setTimeout(() => {
      setCollectionArray((prevState) =>
        prevState.map((recipe, i) =>
          i === index ? { ...recipe, loading: false } : recipe
        )
      );
    }, Math.random() * 1200);
  };

  return (
    <Saved>
      <>
        <div className="wrap">
          <ButtonHover
            value={"BACK TO ALL"}
            icon={<ArrowBack />}
            onClick={() => {
              navigate("/account/profile/collection");
            }}
          />
          {params.name === "collection" && params.id && (
            <div className="wrap-flex">
              <ButtonHover
                value={"DELETE"}
                icon={<Delete />}
                onClick={() => setShowDeleteCollectionModal(true)}
              />
              <ButtonHover
                value={"EDIT"}
                icon={<Edit />}
                onClick={() => setShowEditCollectionModal(true)}
              />
            </div>
          )}
        </div>
        <div className="line-break"></div>
        <div className="section-info">
          {collectionData?.collName === "All Saved Items" ? (
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
                {collectionData?.collDesc && (
                  <h3>{collectionData?.collDesc}</h3>
                )}
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
        <div className="line-break"></div>
        {collectionData?.collRecipes?.length === 0 && (
          <section>
            <h2>You haven't saved anything yet. Start browsing!</h2>
            <p>
              You can save items to your profile by clicking the heart icon in
              the share bar.
            </p>
            <Button
              value={"BACK HOME"}
              onClick={() => navigate("/account/profile/collection")}
              style={{ width: "150px", height: "50px" }}
            />
          </section>
        )}
        {collectionArray.length > 0 && (
          <h3 className="length">{collectionArray.length} items</h3>
        )}
        <div className="collection-control">
          {collectionArray.map((favorite, id) =>
            arrayOfRecipeNames.includes(favorite?.recipeTitle) &&
            !favorite.loading ? (
              <TransparentCard
                key={id}
                favorite={favorite}
                removeRecipeName={removeRecipeName}
                addLoading={() => addLoading(id)}
              />
            ) : (
              <CollectionCard
                key={id}
                addLoading={() => addLoading(id)}
                favorite={favorite}
                addRecipeName={addRecipeName}
              />
            )
          )}
        </div>
        {showDeleteCollectionModal && (
          <DeleteCollectionModal
            onClick={() => setShowDeleteCollectionModal(false)}
            collectionTitle={collectionData.collName}
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
    justify-content: space-between;
    width: 100%;

    .wrap-flex {
      width: 170px;
      display: flex;
      justify-content: space-between;
    }
  }

  section {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
      font-size: 24px;
      color: var(--grey-color);
    }

    p {
      margin: 20px 0 30px 0;
    }
  }

  .section-info {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    min-height: 170px;
    padding: 40px 0;

    h1 {
      font-size: 36px;
      margin-bottom: 12px;
    }

    .height-div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 70px;

      h4 {
        font-weight: 400;
        margin: 12px 0;
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

  .line-break {
    width: 100%;
    height: 1px;
    margin: 20px 0 30px 0;
    background-color: rgba(0, 0, 0, 0.15);
  }

  .collection-control {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    row-gap: 40px;
  }
`;

export default SavedItems;
