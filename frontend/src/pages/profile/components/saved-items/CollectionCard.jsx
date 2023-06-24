import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonBorder from "../../../../common/ButtonBorder";
import RemoveRecipeModal from "./RemoveRecipeModal";
import Loading from "../../../../common/Loading";
import AddCustomModal from "./AddCustomModal";
import useNoScroll from "../../../../utils/useNoScroll";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ favorite, addRecipeName, addLoading }) => {
  const navigate = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useNoScroll(showModal, showRemoveModal);

  const closeModals = () => {
    setShowRemoveModal(false);
    setShowModal(false);
  };

  return (
    <Card>
      {favorite.loading && (
        <div className="transparent-card">
          <Loading style={{ marginBottom: "120px" }} />
        </div>
      )}
      <img
        src={favorite.recipe?.image}
        alt=""
        onClick={() => navigate(`/recipe/${favorite.recipe.id}`)}
      />
      <div className="card-content">
        <h4 onClick={() => navigate(`/recipe/${favorite.recipe.id}`)}>
          {favorite?.recipeTitle}
        </h4>
        <ButtonBorder
          style={{ width: "160px", height: "36px" }}
          value={
            <p>
              <Add /> <span> Add to collection </span>
            </p>
          }
          onClick={() => setShowModal(true)}
        />
      </div>
      {!favorite.loading && (
        <Delete onClick={() => setShowRemoveModal(true)}>
          <Remove />
        </Delete>
      )}
      {showRemoveModal && (
        <RemoveRecipeModal
          remove={() => {
            addRecipeName(favorite.recipeTitle);
            addLoading();
          }}
          title={favorite.recipeTitle}
          onClick={closeModals}
        />
      )}
      {showModal && (
        <AddCustomModal
          favorite={favorite}
          onClick={closeModals}
          showModal={() => setShowModal(false)}
        />
      )}
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  width: 30%;
  display: flex;
  flex-direction: column;
  min-height: 380px;
  box-shadow: var(--card-shadow-border);

  @media (max-width: 1270px) {
    width: 270px;
  }

  .transparent-card {
    position: absolute;
    background-color: rgba(245, 245, 245, 0.83);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  img {
    height: 70%;
  }

  .card-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;

    .summary {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      outline: 1px solid black;
      font-size: 14px;
      font-weight: 400 !important;
    }

    h4 {
      text-align: start;
      color: var(--grey-color);
      cursor: pointer;
      font-size: 18px;
      padding-bottom: 42px;

      &:hover {
        text-decoration: underline;
        color: var(--main-color);
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 12px;

      svg {
        color: var(--red-color);
        font-size: 1.3rem;
        margin-right: 5px;
      }
    }
  }
`;

const Delete = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #fff;
  right: -10px;
  top: -10px;
  border: 1px solid var(--red-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  svg {
    color: var(--red-color);
  }
`;
export default CollectionCard;
