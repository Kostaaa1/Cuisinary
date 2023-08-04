import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import axios from 'axios';
import useNoScroll from '../utils/useNoScroll';
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '../setup/auth/useAuth';
import { useWindowSize } from '../utils/useWindowSize';
import { useQueryClient } from '@tanstack/react-query';

const RecipeCard = ({ recipeData, favorite, setFavorite, params }) => {
  const { user } = useAuth0();
  const { updateQueryCache } = useUser();
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

      // if (collections.data !== '') {
      //   updateQueryCache(['user-data', user?.email], collections.data);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      {windowSize[0] <= 730 ? (
        <HorizontalCard>
          <NavLink to={'/recipe/' + recipeData?.id}>
            <img src={recipeData?.image} alt="" />
          </NavLink>
          <div className="card-desc">
            <h6> {params?.toUpperCase()} </h6>
            <h3>{recipeData?.title}</h3>
          </div>
          {/* <div className="favorite" onClick={(e) => addRecipeToFavorites(e)}>
            {heart ? <Favorite /> : <FavoriteBorder />}
          </div> */}
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
  margin: 24px 0;
  border: 1px solid var(--grey-hover-color);
`;

const NavLink = styled(Link)``;

const HorizontalCard = styled.div`
  position: relative;
  display: flex;
  height: 140px;
  /* height: 180px; */
  /* align-items: center; */
  /* justify-content: center; */

  .horizontal-card-content {
    display: flex;
    flex-direction: column;
    padding: 0 14px;
    width: 100%;

    .star-ratings {
      margin: 10px 0;
    }

    h4 {
      text-align: start;
      color: var(--grey-color);
      cursor: pointer;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
        color: var(--main-color);
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }
  }

  img {
    height: 100%;
  }
`;

const VerticalCard = styled.div`
  position: relative;
  background-color: white;
  min-height: 360px;
  box-shadow: var(--card-shadow-border);

  img {
    width: 100%;
    height: 220px;
  }

  a {
    text-decoration: none;
  }

  .favorite {
    position: absolute;
    top: 0;
    right: 10px;
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

  .card-desc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem 0.7rem;

    h6 {
      letter-spacing: 1.4px !important;
      color: var(--grey-color);
    }

    h3 {
      text-align: start;
      color: var(--main-color);
      margin: 12px 0;
      font-size: 22px !important;
    }
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
