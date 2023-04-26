import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import ButtonBorder from "../../../../common/ButtonBorder";
import Loading from "../../../../common/Loading";
import { debounce, throttle } from "lodash";

const TransparentCard = ({ favorite, removeRecipeName, addLoading }) => {
  const [loading, setLoading] = useState(false);

  const remove = () => {
    removeRecipeName(favorite.recipeTitle);
  };

  return (
    <Card>
      <>
        {/* {favorite.loading && (
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
        )} */}
        <img src={favorite.recipe?.image} alt="" />
        <div className="card__desc">
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
        {!loading && (
          <div className="transparent">
            <button
              onClick={() => {
                remove(), addLoading();
              }}
            >
              Undo
            </button>
          </div>
        )}
      </>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  width: 31%;
  display: flex;
  flex-direction: column;
  min-height: 460px;
  box-shadow: var(--card-shadow-border);

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
      font-size: 18px;
      color: var(--grey-color);
      cursor: pointer;
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
