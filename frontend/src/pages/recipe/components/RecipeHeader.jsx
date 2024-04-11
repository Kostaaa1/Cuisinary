import React, { useContext } from 'react';
import styled from 'styled-components';
import { RecipeContext } from '../Recipe';
import { Link } from 'react-scroll';
import StarRating from '../../../common/StarRating';

const RecipeHeader = () => {
  const { recipe, reviews, averageRate } = useContext(RecipeContext);

  return (
    <Header>
      <h1 className="recipe-name"> {recipe?.title} </h1>
      {reviews?.length > 0 ? (
        <div className="rates-wrap">
          <div className="rates-flex">
            <StarRating averageRate={averageRate} />
            <span className="flex-padding">
              <Link to="review-id" smooth={true} duration={500}>
                {averageRate?.toFixed(1).toString()}
              </Link>
            </span>
            <p> ({reviews?.filter((review) => review.comment !== '').length}) </p>
          </div>
          <div className="divider-line"></div>
          <div className="rates-flex">
            <span>
              <Link to="review-id" smooth={true} duration={500}>
                {reviews?.length} REVIEWS
              </Link>
            </span>
          </div>
        </div>
      ) : (
        <div className="rates-wrap">
          <Link to="rates-id" smooth={true} duration={500}>
            <p className="p-underline">Be the first to rate & review!</p>
          </Link>
        </div>
      )}
    </Header>
  );
};

const Header = styled.div`
  width: 100%;

  h1 {
    font-size: 46px !important;
  }

  .recipe-name {
    font-size: 3rem;
  }

  .rates-wrap {
    padding: 16px 0;
    display: flex;
    align-items: center;
    height: fit-content;

    .divider-line {
      height: 20px;
      width: 1px;
      background-color: #d1d1d1;
      margin: 0 16px;
    }

    .p-underline {
      font-weight: 500;
      color: var(--grey-color);
      cursor: pointer;
    }

    .p-underline,
    span {
      text-decoration: underline;
      text-decoration-color: var(--red-color);
      text-underline-offset: 2px;
      text-decoration-thickness: 6%;

      &:hover {
        text-decoration-thickness: 12%;
      }
    }

    .rates-flex {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;

      .flex-padding {
        margin: 0 8px;
      }

      span {
        letter-spacing: 0.8px;
        font-size: 14px;
        font-weight: 700;
      }

      p {
        color: var(--input-border-color);
        font-weight: 500;
        letter-spacing: 1.4px;
      }

      svg {
        font-size: 22px;
        color: var(--red-color);
      }
    }
  }
`;

export default RecipeHeader;
