import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from './StarRating';
import { DragIndicator } from '@mui/icons-material';
import ReadMoreText from './ReadMoreText';

const HorizontalCard = ({ cardData, image, readMore, isRecipe }) => {
  return (
    <Review>
      {isRecipe ? (
        <Recipe>
          <RecipeLink to={'/recipe/' + cardData?.recipeId}>
            <img src={cardData?.recipeImage} alt="review-image" />
          </RecipeLink>
          <div className="control-flex">
            <Link to={'/recipe/' + cardData?.recipeId}>
              <h2> {cardData?.recipeTitle} </h2>
            </Link>
            <div className="stars-wrap">
              <StarRating averageRate={cardData?.starRating} />
            </div>
            <ReadMoreText text={cardData?.comment} readMore={readMore} maxLength={210} />
          </div>
        </Recipe>
      ) : (
        <Collection>
          <CollectionLink to={'/account/profile/saved-items'}>
            {image?.data?.image ? (
              <img src={image?.data?.image} alt="" />
            ) : (
              <div className="grey-div"></div>
            )}
          </CollectionLink>
          <div className="flex">
            <p>{cardData?.private ? 'PRIVATE' : 'PUBLIC'}</p>
            <CollectionLink to={'/account/profile/saved-items'}>
              <h3>{cardData?.collName}</h3>
            </CollectionLink>
            <span>
              <DragIndicator /> Collection // {cardData?.collRecipes?.length}
            </span>
          </div>
        </Collection>
      )}
    </Review>
  );
};

const RecipeLink = styled(Link)`
  height: 200px;
  width: 340px;
  float: left;
  padding-right: 18px;

  @media screen and (max-width: 729px) {
    height: 140px;
    width: 200px;
  }
`;

const Recipe = styled.div`
  padding: 30px;
  width: 100%;
  display: flex;

  @media screen and (max-width: 729px) {
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .control-flex {
    height: 100%;
    width: 100%;

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

const CollectionLink = styled(Link)`
  height: 150px;
  width: 300px;
`;

const Collection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* justify-content: center; */

  img {
    width: 100%;
    height: 100%;
  }

  .grey-div {
    background-color: #b1b1b1;
    height: 100%;
  }

  .flex {
    width: 100%;
    padding: 0 14px;

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
      color: var(--grey-color);

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

  p {
    font-size: 14px;
  }

  svg {
    color: var(--red-color);
    font-size: 20px;
  }
`;

export default HorizontalCard;
