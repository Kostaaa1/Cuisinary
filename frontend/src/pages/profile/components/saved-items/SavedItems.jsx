import styled from "styled-components";
import { ArrowBack, Delete, Edit, HttpsOutlined, SupervisorAccount } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import TransparentCard from "./TransparentCard";
import Button from "../../../../common/Button";
import ButtonHover from "../../../../common/ButtonHover";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IndexesContext from "../../../../setup/app-context-menager/RecipeNameContext";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../common/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import CollectionModal from "../../../../common/CollectionModal";
import DeleteCollection from "./DeleteCollection";
import { useFavorites } from "../../hooks/useFavorites";
import { useLayoutData } from "../../hooks/useLayoutData";
import { useAuth } from "../../../../setup/auth/useAuth";
import useNoScroll from "../../../../utils/useNoScroll";

const Collections = () => {
  const params = useParams();
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] = useState(false);
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const { user } = useAuth0();

  const { arrayOfRecipeNames, setArrayOfRecipeNames, setCollectionId, collectionId } = useContext(IndexesContext);
  useNoScroll(showDeleteCollectionModal, showEditCollectionModal);

  const addRecipeName = async (id) => {
    const arr = [...arrayOfRecipeNames, id];
    setArrayOfRecipeNames(arr);
  };

  const removeRecipeName = async (id) => {
    const arr = arrayOfRecipeNames.filter((name) => name !== id);
    setArrayOfRecipeNames(arr);
  };

  useEffect(() => {
    if (params.id) {
      setCollectionId(params.id);
    }
  }, [params]);

  const fetchCollectionData = async () => {
    try {
      const res = await axios.get(
        params.id
          ? `/api/auth/${user?.email}/${params.id}/getCustomCollection`
          : `/api/auth/${user?.email}/getSavedCollection`
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: collectionData, isFetching } = useQuery(["collectionData"], fetchCollectionData, {
    refetchOnMount: "always",
    enabled: !!user,
  });

  return (
    <Saved>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <div className="wrap">
            {collectionData?.collName === "All saved items" ? (
              <ButtonHover
                value={"BACK TO ALL"}
                icon={<ArrowBack />}
                onClick={() => navigate("/account/profile/collection")}
              />
            ) : (
              <>
                <ButtonHover
                  value={"BACK TO ALL"}
                  icon={<ArrowBack />}
                  onClick={() => navigate("/account/profile/collection")}
                />
                <div className="wrap-flex">
                  <ButtonHover value={"DELETE"} icon={<Delete />} onClick={() => setShowDeleteCollectionModal(true)} />
                  <ButtonHover value={"EDIT"} icon={<Edit />} onClick={() => setShowEditCollectionModal(true)} />
                </div>
              </>
            )}
          </div>
          <div className="section-info">
            {collectionData?.collName === "All saved items" ? (
              <>
                <h1>{collectionData?.collName}</h1>
                <h3>All your favorite content in one place!</h3>
                <p>
                  <span>
                    <SupervisorAccount />
                    Other users see what you save
                  </span>
                </p>
              </>
            ) : (
              <>
                <h1>{collectionData?.collName}</h1>
                <h3>
                  {collectionData?.collDesc ? collectionData?.collDesc : "All your favorite content in one place!"}
                </h3>
                <p>
                  {collectionData?.private ? (
                    <span>
                      <HttpsOutlined />
                      Private Collection by&nbsp;
                      <span className="nickname"> {userData?.nickname} </span>
                    </span>
                  ) : (
                    <span>
                      <SupervisorAccount />
                      Public Collection by&nbsp;
                      <span className="nickname"> {userData?.nickname} </span>
                    </span>
                  )}
                </p>
              </>
            )}
          </div>
          <div className="line-break"></div>

          {collectionData?.collRecipes.length === 0 && (
            <section>
              <h2>You haven't saved anything yet. Start browsing!</h2>
              <p>You can save items to your profile by clicking the heart icon in the share bar.</p>
              <Button value={"BACK HOME"} onClick={() => navigate("/account/profile/collection")} />
            </section>
          )}
          {collectionData?.collRecipes.length > 0 && (
            <h3 className="length">{collectionData?.collRecipes.length} items</h3>
          )}
          <div className="collection-control">
            {collectionData?.collRecipes.map((favorite, id) =>
              arrayOfRecipeNames.includes(favorite?.recipeTitle) ? (
                <TransparentCard key={id} favorite={favorite} removeRecipeName={removeRecipeName} />
              ) : (
                <CollectionCard
                  key={id}
                  id={id}
                  favorite={favorite}
                  addRecipeName={addRecipeName}
                  showDeleteCollectionModal={showDeleteCollectionModal}
                />
              )
            )}
          </div>
          {showDeleteCollectionModal && (
            <DeleteCollection
              onClick={() => setShowDeleteCollectionModal(false)}
              collectionTitle={collectionData.collName}
            />
          )}
          {showEditCollectionModal && (
            <CollectionModal
              showModal={() => setShowEditCollectionModal(false)}
              collectionTitle={collectionData?.collName}
            />
          )}
        </>
      )}
    </Saved>
  );
};

const Saved = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 20px;
  min-height: 100vh;

  h3 {
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
    margin: 20px;
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
    justify-content: space-around;
    height: 200px;

    h1 {
      margin-top: 50px;
    }

    span {
      font-weight: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .nickname {
        font-weight: 600;
      }

      svg {
        margin-right: 10px;
      }
      h4 {
        font-size: 16px;
      }
    }
  }

  .length {
    font-weight: 500;
    margin: 20px 0;
    padding: 5px 10px;
  }

  .line-break {
    width: 100%;
    height: 1px;
    margin: 25px 0 30px 0;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .collection-control {
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    row-gap: 40px;
    padding: 5px 20px;
  }
`;

export default Collections;
