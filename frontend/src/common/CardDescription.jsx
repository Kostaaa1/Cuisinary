import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import axios from 'axios';
import useNoScroll from '../utils/useNoScroll';
import AuthContext from '../setup/app-context-menager/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '../setup/auth/useAuth';

const CardDescription = ({ recipeData, favorite, setFavorite, params }) => {
  const { userData } = useContext(AuthContext);
  const { user } = useAuth0();
  const { updateQueryCache } = useUser();
  const [heart, setHeart] = useState(false);
  useNoScroll(favorite);

  const addRecipeToFavorites = async () => {
    try {
      let checkForRecipe = userData.collections[0]?.collRecipes.find(
        (recipes) => recipes.recipeTitle === recipeData.title
      );
      userData.collections[0]?.collRecipes.push({
        recipeTitle: recipeData.title,
      });

      setFavorite(true);
      setHeart(true);
      if (checkForRecipe) return;

      const collections = await axios.post(`/api/auth/${userData?.email}`, {
        id: recipeData.id,
      });

      if (collections.data !== '') {
        updateQueryCache(['user-data', user?.email], collections.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card key={recipeData?.id} className="card">
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
    </Card>
  );
};

const Card = styled.div`
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

export default CardDescription;
