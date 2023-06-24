import { Add } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import ButtonBorder from "../../../../common/ButtonBorder";

const TransparentCard = ({ favorite, removeRecipeName, addLoading }) => {
  return (
    <Card>
      <>
        <img src={favorite.recipe?.image} alt="" />
        <div className="card-content">
          <h4>{favorite?.recipeTitle}</h4>
          <ButtonBorder
            style={{ width: "160px", height: "36px" }}
            value={
              <p>
                <Add /> <span> Add to collection </span>
              </p>
            }
          />
        </div>
        <div className="transparent">
          <button
            onClick={() => {
              removeRecipeName(favorite.recipeTitle), addLoading();
            }}
          >
            Undo
          </button>
        </div>
      </>
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

  .transparent {
    position: absolute;
    background-color: rgba(245, 245, 245, 0.73);
    content: "";
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    button {
      margin-bottom: 120px;
      color: var(--main-color);
      text-decoration: none;
      padding: 0.4rem 0.9rem;
      border: none;
      outline: 1px solid var(--red-color);
      font-weight: bold;
      display: block;
      text-align: center;
      align-items: center;
      font-size: 14px;
      max-width: 170px;
      cursor: pointer;

      &:hover {
        background-color: var(--red-color);
        color: white;
      }
    }
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

    h4 {
      text-align: start;
      color: var(--grey-color);
      cursor: pointer;
      font-size: 18px;
      padding-bottom: 42px;
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

export default TransparentCard;
