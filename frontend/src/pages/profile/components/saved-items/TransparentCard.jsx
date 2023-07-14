import { Add } from '@mui/icons-material';
import { useState } from 'react';
import styled from 'styled-components';
import ButtonBorder from '../../../../common/ButtonBorder';
import StarRating from '../../../../common/StarRating';

const TransparentCard = ({ favorite, removeRecipeName, addLoading }) => {
  return (
    <Card>
      <>
        <img src={favorite.data?.image} alt="" />
        <div className="card-content">
          <h4>{favorite?.recipeTitle}</h4>
          <div className="flex">
            <StarRating averageRate={favorite?.averageRate} />
            <p> {favorite?.recipeReviewsLength} </p>
          </div>
          <ButtonBorder
            style={{ width: '160px', height: '36px' }}
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
  min-height: 400px;
  box-shadow: var(--card-shadow-border);

  @media (max-width: 1270px) {
    width: 270px;
  }

  .transparent {
    position: absolute;
    background-color: rgba(245, 245, 245, 0.73);
    content: '';
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
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .flex {
      height: max-content;
      display: flex;
      align-items: start;

      p {
        font-size: 14px;
        margin-left: 6px;
        color: var(--grey-color);
      }
    }

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

export default TransparentCard;
