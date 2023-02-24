import { Add, Remove } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import ButtonBorder from "../../../../common/ButtonBorder";
import Loading from "../../../../common/Loading";

const CollectionCard = ({ favorite, removeRecipeName }) => {
  const [loading, setLoading] = useState(false);

  const remove = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      removeRecipeName(favorite?.recipeTitle);
    }, Math.random() * 800);
  };

  return (
    <Card>
      <>
        {loading && (
          <>
            <div className="transparent"></div>
            <Loading
              styles={{
                position: "absolute",
                content: "",
                bottom: "13%",
                right: "0",
              }}
            />
          </>
        )}
        <img src={favorite.recipe?.image} alt="" />
        <div className="card__desc">
          <h4>{favorite?.recipeTitle}</h4>
          <ButtonBorder
            value={
              <p>
                <Add /> <span> Add to collection </span>
              </p>
            }
          />
        </div>
        {!loading && (
          <div className="transparent">
            <button onClick={() => remove()}>Undo</button>
          </div>
        )}
      </>
    </Card>
  );
};

const Card = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  min-height: 370px;
  position: relative;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);

  @media (max-width: 1030px) {
    width: 270px;
  }
  .transparent {
    position: absolute;
    background-color: rgba(245, 245, 245, 0.73);
    content: "";
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    button {
      margin-bottom: 120px;
      color: var(--main-color);
      text-decoration: none;
      padding: 0.4rem 0.9rem;
      border: none;
      outline: 1px solid #ce4620;
      font-weight: bold;
      border-radius: 3px;
      display: block;
      text-align: center;
      align-items: center;
      font-size: 14px;
      max-width: 170px;
      cursor: pointer;

      &:hover {
        background-color: #ce4620;
        color: white;
      }
    }
  }

  img {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    height: 80%;
  }

  .card__desc {
    padding: 1rem;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;

    h4 {
      text-align: start;
      color: var(--main-color);
      margin-bottom: 10px;
      margin-top: 5px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      svg {
        color: var(--red-color);
        font-size: 1.3rem;
        margin-right: 5px;
      }
    }
  }
`;

export default CollectionCard;
