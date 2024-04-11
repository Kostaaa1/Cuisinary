import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import axios from 'axios';
import useNoScroll from '../utils/useNoScroll';
import { useAuth0 } from '@auth0/auth0-react';
import { useWindowSize } from '../utils/useWindowSize';

const RecipeCard = ({ recipeData, favorite, setFavorite, params }) => {
  const { user } = useAuth0();
  const [heart, setHeart] = useState(false);
  useNoScroll(favorite);
  const windowSize = useWindowSize();

  const addRecipeToFavorites = async () => {
    try {
      setFavorite(true);
      setHeart(true);

      await axios.post(`/api/auth/${user?.email}`, {
        id: recipeData.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      {windowSize[0] < 730 ? (
        <HorizontalCard>
          <Link to={'/recipe/' + recipeData?.id}>
            <img src={recipeData?.image} alt="" />
          </Link>
          <div className="horizontal-card-content">
            <h6> {params?.toUpperCase()} </h6>
            <Link to={'/recipe/' + recipeData?.id}>
              <h3>{recipeData?.title}</h3>
            </Link>
          </div>
          <div className="favorite" onClick={(e) => addRecipeToFavorites(e)}>
            {heart ? <Favorite /> : <FavoriteBorder />}
          </div>
        </HorizontalCard>
      ) : (
        <VerticalCard key={recipeData?.id} className="card">
          <Link to={'/recipe/' + recipeData?.id}>
            <img src={recipeData?.image} alt="" />
            <div className="card-desc">
              <h6> {params?.toUpperCase()} </h6>
              <h3>{recipeData?.title}</h3>
            </div>
          </Link>
          <div className="favorite" onClick={(e) => addRecipeToFavorites(e)}>
            {heart ? <Favorite /> : <FavoriteBorder />}
          </div>
        </VerticalCard>
      )}
    </Card>
  );
};

const Card = styled.div`
  margin: 18px 0;
  border: 1px solid var(--grey-hover-color);
  position: relative;
  background-color: #fff;

  h6 {
    letter-spacing: 1.4px !important;
    color: var(--grey-color);
  }

  h3 {
    text-align: start;
    cursor: pointer;
    font-weight: 700;
    text-align: start;
    color: var(--main-color);
    margin: 8px 0;
    font-size: 22px !important;

    &:hover {
      text-decoration: underline;
      color: var(--main-color);
      text-underline-offset: 5px;
      text-decoration-thickness: 10%;
    }
  }

  .favorite {
    position: absolute;
    top: -5px;
    right: 5px;
    width: 50px;
    height: 50px;
    background-color: var(--red-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    cursor: pointer;
    transform: scale(0.9);

    svg {
      color: white;
    }
  }
`;

const HorizontalCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .horizontal-card-content {
    display: flex;
    flex-direction: column;
    padding: 0 14px;
    width: 100%;
  }

  img {
    width: 320px;
    height: 100%;
  }
`;

const VerticalCard = styled.div`
  min-height: 360px;

  img {
    width: 100%;
    height: 220px;
  }

  a {
    text-decoration: none;
  }

  .card-desc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem 0.7rem;
  }

  &:hover {
    h3 {
      text-decoration: underline;
      text-decoration-color: var(--red-color);
      text-underline-offset: 5px;
      text-decoration-thickness: 8%;
    }
  }
`;

export default RecipeCard;
