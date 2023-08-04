import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from './StarRating';
import { DragIndicator } from '@mui/icons-material';

const HorizontalCard = ({ cardData, image, isRecipe }) => {
  useEffect(() => {
    console.log(cardData);
  }, [cardData]);
  return (
    <Review>
      {isRecipe ? (
        <Recipe>
          <NavLink to={'/recipe/' + cardData?.recipeId}>
            <img src={cardData?.recipeImage} alt="review-image" />
          </NavLink>
          <div className="control-flex">
            <Link to={'/recipe/' + cardData?.recipeId}>
              <h2> {cardData?.recipeTitle} </h2>
            </Link>
            <div className="stars-wrap">
              <StarRating averageRate={cardData?.starRating} />
              <span>&nbsp; My Review</span>
            </div>
            <p> {cardData?.comment} </p>
          </div>
        </Recipe>
      ) : (
        <Collection>
          <NavLink to={'/account/profile/saved-items'}>
            {image?.data?.image ? (
              <img src={image?.data?.image} alt="" />
            ) : (
              <div className="grey-div"></div>
            )}
          </NavLink>
          <div className="flex">
            <p>{cardData?.private ? 'PRIVATE' : 'PUBLIC'}</p>
            <NavLink to={'/account/profile/saved-items'}>
              <h3>{cardData?.collName}</h3>
            </NavLink>
            <span>
              <DragIndicator /> Collection // {cardData?.collRecipes?.length}
            </span>
            <p> {cardData?.comment} </p>
          </div>
        </Collection>
      )}
    </Review>
  );
};

const NavLink = styled(Link)`
  flex: 2.5;
  width: 100%;
  height: 100%;
`;

const Recipe = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  justify-content: center;
  width: 100%;
  height: 200px;

  svg {
    font-size: 18px;
  }

  .control-flex {
    height: 100%;
    flex: 4;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 12px;

    .stars-wrap {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }

    .bordered {
      color: var(--grey-color) !important;
    }

    h2 {
      cursor: pointer;
      width: fit-content;
      color: var(--grey-color);
      font-size: 22px !important;

      &:hover {
        color: var(--main-color);
        text-decoration: underline;
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 8%;
      }
    }
  }
`;

const Collection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 140px;

  .grey-div {
    background-color: #b1b1b1;
    height: 100%;
  }

  .flex {
    flex: 4;
    margin: 0 18px;

    p {
      font-weight: 600;
      letter-spacing: 1.4px;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 20%;
      }
    }

    h3 {
      cursor: pointer;
      margin: 12px 0;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }

    span {
      display: flex;
      align-items: center;

      svg {
        color: var(--grey-color);
      }
    }
  }
`;

const Review = styled.div`
  display: flex;
  position: relative;
  border: 1px solid var(--grey-hover-color);

  img {
    height: 100%;
    max-height: 100%;
  }

  p {
    font-size: 14px;
  }

  svg {
    color: var(--red-color);
  }
`;

export default HorizontalCard;
